import { isAuth } from '../../libs/isAuth';
import Match from '../../models/Match';

export const match = async (_, { matchId }, context) => {
  //isAuth(context);
  const match = await Match.findById(matchId);
  return formatMatch(match);
};

export const matches = async (_, { clubId }, context) => {
  isAuth(context);
  return (await Match.find({ club: clubId })).map((match) => formatMatch(match));
};

const formatMatch = (match) => {
  return {
    id: match._id,
    ...match.toObject(),
    date: new Date(match.date).toISOString(),
  }
}
