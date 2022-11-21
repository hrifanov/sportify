import { format, parseISO } from 'date-fns';

const parseDate = (date) => {
  if (typeof date === 'string') {
    return parseISO(date);
  }

  return date;
};

export function formatDate(date, dateFormat = 'dd-MM-yyyy H:mm') {
  date = parseDate(date);
  return format(date, dateFormat);
}

export function formatTime(date) {
  return formatDate(date, 'HH:mm');
}

export function formatTimer(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000) % 60;
  const minutes = Math.floor(milliseconds / 1000 / 60);
  const hours = Math.floor(milliseconds / 1000 / 60 / 60);
  const pad = (n) => n.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
