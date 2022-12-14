import { throwCustomError } from '../../libs/error';
import { isAuth } from '../../libs/isAuth';
import Event from '../../models/Event';
import Match from '../../models/Match';

export const addEvent = async (_, { matchId, eventInput }, context) => {
  isAuth(context);
  const session = await context.client.startSession();

  try {
    session.startTransaction();
    const match = await Match.findById(matchId);
    if (!match) {
      throwCustomError('No such match', { code: 'match-error' });
    }

    const { id } = await new Event({ ...eventInput }).save({ session });
    match.events.push(id);

    await match.save({ session });
    await session.commitTransaction();

    return id;
  } catch (err) {
    console.error(err);
    await session.abortTransaction();
    throwCustomError(err.message);
  } finally {
    session.endSession();
  }
};

export const editEvent = async (_, { eventId, eventEditInput }, context) => {
  isAuth(context);

  if (Object.entries(eventEditInput).length === 0) {
    throwCustomError('You must select at least one field to edit', {
      code: 'edit-missing',
    });
  }

  try {
    await Event.findByIdAndUpdate(eventId, { ...eventEditInput });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const removeEvent = async (_, { matchId, eventId }, context) => {
  isAuth(context);

  const session = await context.client.startSession();
  try {
    session.startTransaction();

    const match = await Match.findById(matchId);
    if (!match) {
      throwCustomError('No such match', { code: 'match-error' });
    }

    await Event.findByIdAndDelete(eventId, { session });
    await match.update({ $pull: { events: eventId } }, { session });

    await session.commitTransaction();

    return true;
  } catch (err) {
    console.error(err);
    await session.abortTransaction();
    throwCustomError(err.message);
  } finally {
    session.endSession();
  }
};
