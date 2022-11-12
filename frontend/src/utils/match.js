import { TeamsEnum } from '../modules/matches/enums.js';

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
