import { throwCustomError } from '../../libs/error';
import { isAuth } from '../../libs/isAuth';
import Match from '../../models/Match';
import TeamPlayer from '../../models/TeamPlayer';
import User from '../../models/User';
import Event from '../../models/Event';
import mongoose from 'mongoose';

export const createMatch = async (_, { matchInput }, context) => {
  isAuth(context);

  const { club, date, teams, score, timer, shots, seasonId, events } = matchInput;
  const session = await context.client.startSession();

  try {
    session.startTransaction();

    const playerIds = await createTeamPlayers(
      [...teams.home.teamPlayers, ...teams.guest.teamPlayers],
      session
    );

    const newMatchId = mongoose.Types.ObjectId()
    const matchEvents = events.map((event) => ({
      ...event,
      matchId: newMatchId,
    }))

    const insertedEvents = await Event.insertMany(matchEvents, { session });

    const match = await new Match({
      _id: newMatchId,
      club,
      date,
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
      score: score || {home: 0, guest: 0},
      shots: shots || {home: 0, guest: 0},
      timer,
      season: seasonId,
      events: insertedEvents.map((event) => event._id.toString()),
    }).save({ session });

    await session.commitTransaction();
    return match;
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

  const teams = await TeamPlayer.insertMany(teamPlayers, { session });
  return teams.map((player) => player.id);
};
