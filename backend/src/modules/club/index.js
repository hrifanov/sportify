import { typeDef } from './schema';
import * as queries from './query';
import * as mutations from './mutation';
import User from '../../models/User';
import Season from '../../models/Season';
import Match from '../../models/Match';
import { getTeamStatistics } from '../user/statistics';

export { typeDef, resolvers };

const resolvers = {
  Query: {
    ...queries,
  },
  Mutation: {
    ...mutations,
  },
  Club: {
    async contactPerson(parent) {
      return User.findById(parent.contactPerson);
    },
    async players(parent) {
      const players = await Promise.all(parent.players.map(async (player) => {
        const user = await User.findById(player.user).select(
          'id userName name email',
        );

        if (!user) {
          await parent.update({ $pull: { players: { user: player.user } } });
          return null;
        }

        return {
          ...user.toObject(),
          id: user.id, // id, not _id
          isAdmin: player.isAdmin,
        };
      }));

      return players.filter(Boolean);
    },
    async matches(parent) {
      return Match.find({ club: parent.id });
    },
    async seasons(parent) {
      return Season.find({ club: parent.id });
    },
    async playerStatistics(club, { seasonId }){
      return await getTeamStatistics(club.id, seasonId);
    }
  }
};
