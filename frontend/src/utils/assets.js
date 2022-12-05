import { config } from 'src/config';

export const beAsset = (path) => {
  if (!path) return;
  return `${config.BE_ROOT}/${path}`;
};
