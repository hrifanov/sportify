import { throwCustomError } from '../../libs/error';
import { isAuth } from '../../libs/isAuth';
import Match from '../../models/Match';
import TeamPlayer from '../../models/TeamPlayer';
import User from '../../models/User';

export const createMatch = async (_, { matchInput }, context) => {
  isAuth(context);

  const { club, date, teams } = matchInput;
  const session = await context.client.startSession();

  try {
    session.startTransaction();

    const playerIds = await createTeamPlayers(
      [...teams.home.teamPlayers, ...teams.guest.teamPlayers],
      session
    );

    const matchId = await new Match({
      club: club,
      date: date,
      teams: {
        home: {
          name: teams.home.name,
          teamPlayers: playerIds.slice(0, teams.home.teamPlayers.length),
        },
        guest: {
          name: teams.guest.name,
          teamPlayers: playerIds.slice(teams.home.teamPlayers.length),
        },
      },
    })
      .save({ session })
      .then((doc) => doc.id);

    await session.commitTransaction();
    //await session.abortTransaction();
    return matchId;
  } catch (err) {
    console.error(err);
    await session.abortTransaction();
    throwCustomError('Unable to create new match', { code: 'match-error' });
  } finally {
    session.endSession();
  }
};

const createTeamPlayers = async (teamPlayers, session) => {
  const userIds = teamPlayers.map((player) => player.user);
  const users = await User.find({ _id: { $in: userIds } }).select('userName');

  if (users.length !== teamPlayers.length) {
    throwCustomError('All team players must reference existent users', {
      code: 'no-user',
    });
  }

  return await TeamPlayer.insertMany(teamPlayers, { session }).then((doc) =>
    doc.map((player) => player.id)
  );
};
