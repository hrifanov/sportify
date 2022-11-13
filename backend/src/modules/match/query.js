import { isAuth } from '../../libs/isAuth';
import Match from '../../models/Match';

export const match = async (_, { matchId }, context) => {
  isAuth(context);
  return await Match.findById(matchId);
};

export const matches = async (_, { clubId }, context) => {
  isAuth(context);
  return await Match.find({ club: clubId });
};

export const events = async (_, { matchId }, context) => {
  isAuth(context);
  const {events} = await Match.findById(matchId).select('events');
  return events;
};
