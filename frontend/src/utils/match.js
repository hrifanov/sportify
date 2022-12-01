import { EventEnum, TeamsEnum } from '../modules/matches/enums.js';
import { orderBy, reduce } from 'lodash';

export function timeToTimer(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000) % 60;
  const minutes = Math.floor(milliseconds / 1000 / 60);
  const hours = Math.floor(milliseconds / 1000 / 60 / 60);
  const pad = (n) => n.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function timerToTime(timer) {}

export const formatScore = (score) => {
  return `${score[TeamsEnum.HOME]}:${score[TeamsEnum.GUEST]}`;
};

export const formatPenaltyLength = (length) => {
  const seconds = length % 60;
  const minutes = Math.floor(length / 60);

  const parts = [];
  if (minutes) {
    parts.push(`${minutes} m`);
  }
  if (seconds) {
    parts.push(`${seconds} s`);
  }
  return parts.join(' ');
};

export const getMatchPlayers = (match) => {
  const home = match.teams[TeamsEnum.HOME];
  const guest = match.teams[TeamsEnum.GUEST];
  return reduce(
    [...home.teamPlayers, ...guest.teamPlayers],
    (acc, player) => {
      acc[player.user.id] = {
        id: player.user.id,
        name: player.user.name,
        role: player.role,
      };
      return acc;
    },
    {},
  );
};

export const calculateScore = (events, { tillEvent = null, countTotal = true } = {}) => {
  if (tillEvent) {
    const tillEventIndex = events.findIndex((event) => event.id === tillEvent.id);
    events = events.slice(0, tillEventIndex + 1);
  }

  const acc = {
    [TeamsEnum.HOME]: 0,
    [TeamsEnum.GUEST]: 0,
  };

  if (countTotal) {
    acc.total = 0;
  }

  return events.reduce((acc, event) => {
    if (event.type === EventEnum.GOAL) {
      acc[event.data.teamId] = acc[event.data.teamId] + 1;
      if (countTotal) {
        acc.total++;
      }
    }
    return acc;
  }, acc);
};

export const populateEvents = (match, events = match.events) => {
  console.log({ match, events });
  if (!match || !events?.length) return [];
  const players = getMatchPlayers(match);

  console.log({ players });

  const populatedEvents = events.map((event) => {
    if (event.type === EventEnum.GOAL) {
      return {
        ...event,
        player: players[event.data.playerId],
        assistPlayer: players[event.data.assistId],
        secondAssistPlayer: players[event.data.secondAssistId],
        score: calculateScore(events, { tillEvent: event }),
      };
    }
    if (event.type === EventEnum.PENALTY) {
      return {
        ...event,
        player: players[event.data.playerId],
      };
    }
    return event;
  });

  console.log({ populatedEvents });

  return orderBy(populatedEvents, ['time', 'score.total'], ['desc', 'desc']);
};
