import { EventEnum, TeamsEnum } from 'src/modules/matches/enums';

import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { orderBy, reduce, cloneDeep, omit, maxBy, map } from 'lodash';
import uniqid from 'uniqid';
import { client } from 'src/utils/apollo';
import {
  ADD_EVENT_MUTATION,
  CREATE_MATCH_MUTATION,
  EDIT_EVENT_MUTATION,
  EDIT_MATCH_MUTATION,
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

const eventToRaw = (event) => {
  const rawEvent = {
    type: event.type,
    time: event.time,
    data: event.data,
  };

  if (event.id && !event.id.includes('local')) {
    rawEvent.id = event.id;
  }

  return rawEvent;
};

const getInitialState = ({ match = null, isPast = false, lastFinishedMatchId = null } = {}) => {
  return {
    match,
    lastFinishedMatchId,
    isPast: !!match?.id || isPast,
    events: cloneDeep(match?.events ?? []),
    timer: 0,
    timerInterval: null,
    isPaused: true,
    enums: {},
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
  startInteractiveMatch: (args = {}) => {
    set(getInitialState(args));
  },
  setEnums: (enums) => {
    set((state) => {
      state.enums = enums;
    });
  },
  updateMatchTimer: () => {
    const highestTime = maxBy(get().computed.validEvents, 'time')?.time ?? 0;

    if (get().isPast || highestTime > get().timer) {
      set((state) => {
        state.timer = highestTime;
      });
    }
  },
  addEvent: (event) => {
    set((state) => {
      state.events.push({
        id: uniqid('local-'),
        ...event,
        time: stringToTime(event.time),
        _synced: false,
      });
    });
    get().updateMatchTimer();
  },
  addGoal: (event) => {
    get().addEvent({
      type: EventEnum.GOAL,
      time: event.time,
      data: event.data,
    });
    get().addShot(event.data.teamId);
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
    const event = get().events.find((event) => event.id === id);
    if (event.type === EventEnum.GOAL) {
      get().addShot(event.data.teamId, -1);
    }
    get().editEvent(id, { _deleted: true });
    get().updateMatchTimer();
  },
  addShot: (teamId, value = 1) => {
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
  clearStore: (state = {}) => {
    set(getInitialState(state));
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
    if (get().computed.isEdit) {
      return await get().saveMatchEdit();
    }

    return await get().saveNewMatch();
  },
  saveNewMatch: async () => {
    const matchInput = get().computed.rawMatch;
    try {
      const { data } = await client.mutate({
        mutation: CREATE_MATCH_MUTATION,
        variables: { matchInput },
      });
      get().clearStore({ lastFinishedMatchId: data.createMatch.id });
      return true;
    } catch (e) {
      console.error({ e });
    }
  },
  saveMatchEdit: async () => {
    const deletedEvents = get()
      .events.filter((event) => event._deleted && event.id)
      .map(eventToRaw);
    const modifiedEvents = get()
      .computed.validEvents.filter((event) => event._synced === false)
      .map(eventToRaw);
    const rawMatch = get().computed.rawMatch;

    const editMatchInput = {
      matchId: get().match.id,
      timer: rawMatch.timer,
      score: rawMatch.score,
      shots: rawMatch.shots,
      deletedEvents,
      modifiedEvents,
    };

    console.log({ editMatchInput });

    try {
      const { data } = await client.mutate({
        mutation: EDIT_MATCH_MUTATION,
        variables: { editMatchInput },
      });
      get().clearStore({ lastFinishedMatchId: get().match.id });
      return true;
    } catch (e) {
      console.error({ e });
    }
  },
  computed: {
    get rawMatch() {
      const mapTeam = (teamId) => {
        return {
          name: get().match.teams[teamId].name,
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
        events: get().computed.validEvents.map(eventToRaw),
        score: get().calculateScore({ countTotal: false }),
        shots: {
          [TeamsEnum.HOME]: get().shots[TeamsEnum.HOME],
          [TeamsEnum.GUEST]: get().shots[TeamsEnum.GUEST],
        },
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
