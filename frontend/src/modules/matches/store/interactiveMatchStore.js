import { EventEnum, TeamsEnum } from 'src/modules/matches/enums';

import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { orderBy, reduce, cloneDeep } from 'lodash';
import uniqid from 'uniqid';
import { client } from 'src/utils/apollo';
import {
  ADD_EVENT_MUTATION,
  EDIT_EVENT_MUTATION,
  REMOVE_EVENT_MUTATION,
} from 'src/modules/matches/apollo/mutations';
import produce from 'immer';
export const INTERACTIVE_MATCH_ACTIONS = {
  GOAL: 'goal',
  PENALTY: 'penalty',
  DELETE_EVENT: 'deleteEvent',
  CANCEL_MATCH: 'cancelMatch',
  FINISH_MATCH: 'finishMatch',
};

class Event {
  _id = null;
  _synced = false;
  _deleted = false;
  id = uniqid();
  constructor(data) {
    Object.assign(this, data);
  }
}

const getInitialState = (match = null) => {
  return {
    match,
    events: [],
    timer: 0,
    timerInterval: null,
    isPaused: true,
    shots: {
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
  startInteractiveMatch: (match) => {
    set(getInitialState(match));
  },
  addEvent: (event) => {
    set((state) => {
      state.events.push(
        new Event({
          time: state.timer,
          ...event,
        }),
      );
    });
  },
  editEvent: (id, data) => {
    set((state) => {
      const eventIndex = state.events.findIndex((event) => event.id === id);
      if (eventIndex === -1) return;
      console.log({ event: state.events[eventIndex], data });
      const clonedEvent = cloneDeep(state.events[eventIndex]);
      Object.assign(clonedEvent, {
        ...data,
        _synced: false,
      });
      state.events[eventIndex] = clonedEvent;
    });
  },
  deleteEvent: (id) => {
    get().editEvent(id, { _deleted: true });
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
  calculateScore: (tillEvent = null) => {
    let events = get().events;

    if (tillEvent) {
      const tillEventIndex = get().events.findIndex((event) => event.id === tillEvent.id);
      events = events.slice(0, tillEventIndex + 1);
    }

    return events.reduce(
      (acc, event) => {
        if (event.type === EventEnum.GOAL) {
          acc.total++;
          acc[event.data.teamId] = acc[event.data.teamId] + 1;
        }
        return acc;
      },
      {
        total: 0,
        [TeamsEnum.HOME]: 0,
        [TeamsEnum.GUEST]: 0,
      },
    );
  },
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
  cancelMatch: () => {
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
  finishMatch: () => {
    get().pauseTimer();
  },
  computed: {
    get teams() {
      return get().match?.teams;
    },
    get players() {
      const home = this.teams[TeamsEnum.HOME];
      const guest = this.teams[TeamsEnum.GUEST];
      return reduce(
        [...home.teamPlayers, ...guest.teamPlayers],
        (acc, player) => {
          acc[player.id] = {
            ...player,
            ...player.user,
            id: player.id,
          };
          return acc;
        },
        {},
      );
    },
    get events() {
      const activeEvents = get().events.filter((event) => !event._deleted);
      const enhancedEvents = activeEvents.map((event) => {
        if (event.type === EventEnum.GOAL) {
          return new Event({
            ...event,
            player: this.players[event.data.playerId],
            assistPlayer: this.players[event.data.assistId],
            secondAssistPlayer: this.players[event.data.secondAssistId],
            score: get().calculateScore(event),
          });
        }
        if (event.type === EventEnum.PENALTY) {
          return new Event({
            ...event,
            player: this.players[event.data.playerId],
          });
        }
        return event;
      });

      return orderBy(enhancedEvents, ['time', 'score.total'], ['desc', 'desc']);
    },
    get score() {
      return get().calculateScore();
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
    deserialize: (state) => {
      const parsedState = JSON.parse(state);

      return produce(parsedState, (draft) => {
        draft.state.events = parsedState.state.events.map((event) => new Event(event));
      });
    },
  }),
);
