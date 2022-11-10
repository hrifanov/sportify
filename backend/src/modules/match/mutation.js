import { isAuth } from '../../libs/isAuth';
import Match from '../../models/Match';

export const createMatch = async (_, { matchInput }, context) => {
  isAuth(context);
  const match = new Match({ ...matchInput, events: [] });

  return await match
    .save()
    .then((saveDoc) => saveDoc.id)
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const addEvent = async (_, { matchId, eventInput }, context) => {
  isAuth(context);
  await Match.findByIdAndUpdate(matchId, {
    $push: { events: eventInput },
  }).orFail();
  return true;
};
