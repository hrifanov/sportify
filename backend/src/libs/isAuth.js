import { ACCESS_TOKEN_SECRET } from '../config/variables';
import { verifyToken } from './auth';
import { throwCustomError } from './error';

export const isAuth = (context) => {
  const authorization = context.req.headers['authorization'];
  if (!authorization) {
    throwCustomError('Please authenticate by logging in', { code: 'not-authenticated' })
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verifyToken(token, ACCESS_TOKEN_SECRET);
    context.payload = payload;
  } catch (err) {
      throwCustomError('Access token expired, please refresh your access token', { code: 'jwt-expired' })
  }

  //return next();
  return;
};
