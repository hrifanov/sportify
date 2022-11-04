import { throwCustomError } from '../../libs/error';
import Club from '../../models/Club';

export const addPlayer = async (_, { clubId, userId }) => {
  const club = await Club.findById(clubId).select('players');

  if (!club) {
    throwCustomError(`Club with id ${clubId} does not exits`);
  }

  console.log(club.players);

  if (club.players.includes(userId)) {
    return throwCustomError(
      `Club already includes the player with id ${userId}`
    );
  }

  await Club.findOneAndUpdate({ _id: clubId }, { $push: { players: userId } });
  return true;
};
