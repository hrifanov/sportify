import { typeDef } from './schema';
import * as queries from './query';
import * as mutations from './mutation';
import User from '../../models/User.js';
import Club from '../../models/Club.js';
import { getUserStatisticsForTeam } from '../user/statistics.js';

export { typeDef, resolvers };

const resolvers = {
  Query: {
    ...queries,
  },
  Mutation: {
    ...mutations,
  },
  Season: {
    async club(parent) {
      return Club.findById(parent.club);
    },
    async statistics(parent) {
      const club = await this.club(parent);
      const users = await Promise.all(club.players.map(async (player) => User.findById(player.user)));

      return users.map(async user => {
        return ({
          user,
          statistics: await getUserStatisticsForTeam(user.id, club.id, parent.id),
        })
      });
    }
  },
};
