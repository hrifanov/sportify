import jwt, { sign } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config/variables';

export const createAccessToken = (user) => {
  return sign({ userId: user.id }, ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

export const createRefreshToken = (user) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d',
    }
  );
};

export function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}
