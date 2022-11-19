import { throwCustomError } from '../../libs/error';
import { isAuth, isClubAdmin } from '../../libs/isAuth';
import Match from '../../models/Match';

export const addEvent = async (_, { matchId, eventInput }, context) => {
  isAuth(context);

  try {
    await Match.findByIdAndUpdate(matchId, {
      $push: { events: eventInput },
    }).orFail();

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const removeEvent = async (_, { matchId, eventId }, context) => {
  isAuth(context);

  try {
    const match = await Match.findById(matchId);

    if (!match) {
      throwCustomError(`Match with id ${matchId} does not exits`, {
        code: 'no-club',
      });
    }

    await isClubAdmin(match.club.toString(), context.payload.userId);

    await match.update({ $pull: { events: { _id: eventId } } });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
