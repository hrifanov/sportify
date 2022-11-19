import { isAuth } from '../../libs/isAuth';
import Match from '../../models/Match';
import Event from '../../models/Event';

export const events = async (_, { matchId }, context) => {
  isAuth(context);

  const { events } = await Match.findById(matchId).select('events');
  return await Event.find({ _id: { $in: events } });
};
