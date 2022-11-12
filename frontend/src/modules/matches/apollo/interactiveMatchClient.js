import { makeVar, useReactiveVar } from '@apollo/client';
import { makeLocalStorageItem } from 'src/utils/storage';
import { useNavigate } from 'react-router-dom';
import { route } from 'src/Routes';
import { auth } from 'src/modules/auth/apollo/client';
import { EventEnum, TeamsEnum } from '../enums.js';
import { groupBy, orderBy, reduce } from 'lodash';
import uniqid from 'uniqid';

const LOCAL_STORAGE_INTERACTIVE_MATCH_KEY = 'interactive-match';
const persistedState = makeLocalStorageItem(LOCAL_STORAGE_INTERACTIVE_MATCH_KEY);

const getInitialState = () => {
  const { teams, events, timer, isPaused, shots } = persistedState() ?? {};
  return {
    teams,
    events: events ?? [],
    timer: timer ?? 0,
    isPaused: isPaused ?? true,
    shots: shots ?? {
      [TeamsEnum.HOME]: 0,
      [TeamsEnum.GUEST]: 0,
    },
  };
};

const state = makeVar(getInitialState());
const uiState = makeVar({
  action: null,
  props: null,
});

export const INTERACTIVE_MATCH_ACTIONS = {
  GOAL: 'goal',
  PENALTY: 'penalty',
};

export const addEvent = (event) => {
  state({
    ...state(),
    events: [
      ...state().events,
      {
        ...event,
        id: uniqid(),
        time: state().timer,
      },
    ],
  });
};

export const teamAction = ({ action, teamId }) => {
  uiState({
    action: action,
    props: {
      teamId,
    },
  });
};
export const finishAction = () => {
  uiState({
    action: null,
    props: null,
  });
};

export const getPlayersById = () => {
  const home = state().teams[TeamsEnum.HOME];
  const guest = state().teams[TeamsEnum.GUEST];
  return reduce(
    [...home.teamPlayers, ...guest.teamPlayers],
    (acc, player) => {
      acc[player.id] = player;
      return acc;
    },
    {},
  );
};

export const getPlayer = (playerId) => {
  return getPlayersById()[playerId];
};

export const getShots = (teamId) => {
  return state().shots[teamId];
};

export const addShots = (teamId, value = 1) => {
  let newShots = state().shots[teamId] + value;
  if (newShots < 0) {
    newShots = 0;
  }

  state({
    ...state(),
    shots: {
      ...state().shots,
      [teamId]: newShots,
    },
  });
};

export const getOrderedEvents = () => orderBy(state().events, 'time');

export const getScore = (event = null) => {
  let goalEvents = getOrderedEvents().filter((event) => event.type === EventEnum.GOAL);
  if (event) {
    const eventIndex = goalEvents.findIndex((e) => e.id === event.id);
    goalEvents = goalEvents.slice(0, eventIndex + 1);
  }

  return reduce(
    goalEvents,
    (acc, event) => {
      if (event.type === EventEnum.GOAL) {
        acc[event.team] += 1;
      }
      return acc;
    },
    {
      [TeamsEnum.HOME]: 0,
      [TeamsEnum.GUEST]: 0,
    },
  );
};

const persistState = () => {
  persistedState(state());
};

const onNextChange = () => {
  persistState();
  state.onNextChange(onNextChange);
};

state.onNextChange(onNextChange);

export const useInteractiveMatchClient = () => {
  const navigate = useNavigate();

  const startInteractiveMatch = (match) => {
    state({
      ...getInitialState(),
      teams: match.teams,
    });
    navigate(route.matchInteractive());
  };

  return {
    teamAction,
    addEvent,
    addShots,
    finishAction,
    getPlayer,
    getScore,
    getShots,
    startInteractiveMatch,
    state: useReactiveVar(state),
    uiState: useReactiveVar(uiState),
  };
};

export const interactiveMatchState = state;
