import { EventEnum, TeamsEnum } from '../modules/matches/enums.js';
import { orderBy, reduce } from 'lodash';
import { config } from 'src/config';

export function timeToString(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000) % 60;
  const minutes = Math.floor(milliseconds / 1000 / 60);
  const hours = Math.floor(milliseconds / 1000 / 60 / 60);
  const pad = (n) => n.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function stringToTime(timer) {
  const [hours, minutes, seconds] = timer.split(':');
  const houseInMilliseconds = parseInt(hours) * 60 * 60 * 1000;
  const minutesInMilliseconds = parseInt(minutes) * 60 * 1000;
  const secondsInMilliseconds = parseInt(seconds) * 1000;
  return houseInMilliseconds + minutesInMilliseconds + secondsInMilliseconds;
}

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
  events = orderBy(events, ['time'], ['asc']);

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

  return events.reverse().reduce((acc, event) => {
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
  if (!match || !events?.length) return [];
  const players = getMatchPlayers(match);

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

  return orderBy(populatedEvents, ['time', 'score.total'], ['desc', 'desc']);
};

export const uploadLogo = async (file) => {
  const formData = new FormData();
  formData.append(file.name, file);

  const response = await fetch(`${config.BE_ROOT}/upload`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    body: formData, // body data type must match "Content-Type" header
  });

  return response.json(); // parses JSON response into native JavaScript objects
};
