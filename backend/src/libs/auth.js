import { createToken } from './token';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config/variables';

export const createTokens = (user) => {
  const refreshToken = createToken(
    { id: user.id, count: user.count },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' },
  );

  const accessToken = createToken({ id: user.id }, ACCESS_TOKEN_SECRET, {
    expiresIn: '15min',
  });

  return { refreshToken, accessToken };
};
