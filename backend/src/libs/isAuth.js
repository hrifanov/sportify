import { ACCESS_TOKEN_SECRET } from '../config/variables';
import Club from '../models/Club';
import { verifyToken } from './auth';
import { throwCustomError } from './error';

export const isAuth = (context) => {
  const authorization = context.req.headers['authorization'];
  if (!authorization) {
    throwCustomError('Please authenticate by logging in', {
      code: 'not-authenticated',
    });
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verifyToken(token, ACCESS_TOKEN_SECRET);
    context.payload = payload;
  } catch (err) {
    throwCustomError('Access token expired, please refresh your access token', {
      code: 'jwt-expired',
    });
  }

  //return next();
  return;
};

export const isClubAdmin = async (clubId, userId) => {
  let user;

  try {
    const club = await Club.findById(clubId).select('players');
    user = club.players.find((players) => players.user.toString() === userId);
  } catch (err) {
    console.log(err);
    throwCustomError('Club or userId not valid', {
      code: 'not-valid',
    });
  }

  if (!user || !user.isAdmin) {
    throwCustomError('No permission to perform this action', {
      code: 'no-admin',
    });
  }
};
