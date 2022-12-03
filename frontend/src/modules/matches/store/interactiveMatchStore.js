import { EventEnum, TeamsEnum } from 'src/modules/matches/enums';

import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { orderBy, reduce, cloneDeep, omit, maxBy } from 'lodash';
import uniqid from 'uniqid';
import { client } from 'src/utils/apollo';
import {
  ADD_EVENT_MUTATION,
  CREATE_MATCH_MUTATION,
  EDIT_EVENT_MUTATION,
  REMOVE_EVENT_MUTATION,
} from 'src/modules/matches/apollo/mutations';
import produce from 'immer';
import { calculateScore, populateEvents, stringToTime } from 'src/utils/match';
export const INTERACTIVE_MATCH_ACTIONS = {
  GOAL: 'goal',
  PENALTY: 'penalty',
  DELETE_EVENT: 'deleteEvent',
  CANCEL_MATCH: 'cancelMatch',
  FINISH_MATCH: 'finishMatch',
};

const getInitialState = (match = null, { isPast = false } = {}) => {
  return {
    match,
    isPast: !!match?.id || isPast,
    events: cloneDeep(match?.events || []),
    timer: 0,
    timerInterval: null,
    isPaused: true,
    shots: match?.shots ?? {
      [TeamsEnum.HOME]: 0,
      [TeamsEnum.GUEST]: 0,
    },
    ui: {
      action: null,
      props: {},
    },
  };
};

const store = (set, get) => ({
  ...getInitialState(),
  startInteractiveMatch: (match, args = {}) => {
    set(getInitialState(match, args));
  },
  updateMatchTimer: () => {
    if (get().isPast) {
      set((state) => {
        state.timer = maxBy(get().computed.validEvents, 'time')?.time ?? 0;
      });
    }
  },
  addEvent: (event) => {
    set((state) => {
      state.events.push({
        id: uniqid(),
        ...event,
        time: stringToTime(event.time),
        _synced: false,
      });
    });
    get().updateMatchTimer();
  },
  editEvent: (id, data) => {
    set((state) => {
      const eventIndex = state.events.findIndex((event) => event.id === id);
      if (eventIndex === -1) return;

      if (data.time) {
        data.time = stringToTime(data.time);
      }

      state.events[eventIndex] = {
        ...cloneDeep(state.events[eventIndex]),
        ...data,
        _synced: false,
      };
    });
    get().updateMatchTimer();
  },
  deleteEvent: (id) => {
    get().editEvent(id, { _deleted: true });
    get().updateMatchTimer();
  },
  // syncAddEvent: async (event) => {
  //   const result = await client.mutate({
  //     mutation: ADD_EVENT_MUTATION,
  //     variables: {
  //       matchId: get().match.id,
  //       eventInput: {
  //         type: event.type,
  //         time: event.time,
  //         data: event.data,
  //       },
  //     },
  //   });
  //   set((state) => {
  //     const storedEvent = state.events.find((e) => e.id === event.id);
  //     storedEvent._id = result.data.addEvent;
  //     storedEvent._synced = true;
  //   });
  // },
  // syncEditEvent: async (event) => {
  //   await client.mutate({
  //     mutation: EDIT_EVENT_MUTATION,
  //     variables: {
  //       eventId: event._id,
  //       eventEditInput: {
  //         type: event.type,
  //         time: event.time,
  //         data: event.data,
  //       },
  //     },
  //   });
  // },
  // syncDeleteEvent: async (event) => {
  //   await client.mutate({
  //     mutation: REMOVE_EVENT_MUTATION,
  //     variables: {
  //       eventId: event._id,
  //       matchId: get().match.id,
  //     },
  //   });
  //   return set((state) => {
  //     state.events = state.events.filter((e) => e.id !== event.id);
  //   });
  // },
  // syncEvents: async () => {
  //   for (const event of get().events.filter((event) => !event._synced)) {
  //     try {
  //       if (event._deleted) {
  //         return await get().syncDeleteEvent(event);
  //       }
  //
  //       const isEdit = !!event._id;
  //       if (isEdit) {
  //         return await get().syncEditEvent(event);
  //       }
  //
  //       return await get().syncAddEvent(event);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  // },
  addShot: (teamId, value) => {
    set((state) => {
      let newShots = state.shots[teamId] + value;
      if (newShots < 0) {
        newShots = 0;
      }
      state.shots[teamId] = newShots;
    });
  },
  setShots: (teamId, value) => {
    if (!value) {
      value = 0;
    }
    value = parseInt(value);
    if (value > 999) {
      return;
    }
    set((state) => {
      state.shots[teamId] = value;
    });
  },
  calculateScore: (args) => calculateScore(get().computed.events, args),
  pauseTimer: () => {
    set((state) => {
      state.isPaused = true;
      return clearInterval(state.timerInterval);
    });
  },
  runTimer: () => {
    set((state) => {
      state.isPaused = false;

      const incrementTimerBy = 1000;
      state.timerInterval = setInterval(() => {
        set((state) => {
          state.timer += incrementTimerBy;
        });
      }, incrementTimerBy);
    });
  },
  toggleTimer: () => {
    if (get().isPaused) {
      return get().runTimer();
    }

    get().pauseTimer();
  },
  clearStore: () => {
    set(getInitialState());
  },
  uiAction: (action, props = {}) => {
    get().pauseTimer();
    set({
      ui: {
        action,
        props,
      },
    });
  },
  finishAction: () => {
    set({
      ui: getInitialState().ui,
    });
  },
  finishMatch: async () => {
    const matchInput = get().computed.rawMatch;

    try {
      const { data } = await client.mutate({
        mutation: CREATE_MATCH_MUTATION,
        variables: { matchInput },
      });
      return data.createMatch;
    } catch (e) {
      console.error({ e });
    }
  },
  computed: {
    get rawMatch() {
      const mapTeam = (teamId) => {
        return {
          name: get().match.teams[TeamsEnum.HOME].name,
          teamPlayers: get().match.teams[teamId].teamPlayers.map((teamPlayer) => ({
            role: teamPlayer.role,
            user: teamPlayer.user.id,
          })),
        };
      };

      return {
        date: get().match.date,
        timer: get().timer,
        club: get().match.club,
        teams: {
          home: mapTeam(TeamsEnum.HOME),
          guest: mapTeam(TeamsEnum.GUEST),
        },
        events: get().computed.validEvents.map((event) => ({
          type: event.type,
          time: event.time,
          data: event.data,
        })),
        score: get().calculateScore({ countTotal: false }),
        shots: get().shots,
        seasonId: get().match.seasonId ?? '6388b2123160f796e5e99bec',
      };
    },
    get teams() {
      return get().match?.teams;
    },
    get validEvents() {
      return get().events.filter((event) => !event._deleted);
    },
    get events() {
      return populateEvents(get().match, get().computed.validEvents);
    },
    get score() {
      return get().calculateScore();
    },
    get isEdit() {
      return get().match.id;
    },
    get canBeFinished() {
      return (
        get().computed.validEvents?.length > 0 ||
        (get().shots[TeamsEnum.HOME] > 0 && get().shots[TeamsEnum.GUEST] > 0)
      );
    },
  },
});

export const useInteractiveMatchStore = create(
  persist(immer(subscribeWithSelector(store)), {
    name: 'interactive-match',
    getStorage: () => localStorage,
    partialize: (state) => {
      const ommitedKeys = ['computed', 'isPaused'];
      return Object.fromEntries(
        Object.entries(state).filter(([key]) => !ommitedKeys.includes(key)),
      );
    },
  }),
);