import { ACCESS_TOKEN_SECRET } from '../config/variables';
import { verifyToken } from './auth';
import { GraphQLError } from 'graphql';

export const isAuth = (context) => {
  const authorization = context.req.headers['authorization'];
  if (!authorization) {
    throw new GraphQLError('please authenticate by logging in', {
      extensions: { code: 'not-authenticated' },
    });
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verifyToken(token, ACCESS_TOKEN_SECRET);
    context.payload = payload;
  } catch (err) {
    throw new GraphQLError(
      'access token expired, please refresh your access token',
      {
        extensions: { code: 'jwt-expired' },
      }
    );
  }

  //return next();
  return;
};
