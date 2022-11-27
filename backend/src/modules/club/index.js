import { typeDef } from './schema';
import * as queries from './query';
import * as mutations from './mutation';
import User from '../../models/User';

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
      return await User.findById(parent.contactPerson);
    },
    players(parent) {
      return parent.players.map(async (player) => {
        const user = await User.findById(player.user).select(
          'id userName name email'
        );

        return {
          ...user.toObject(),
          id: user.id, // id, not _id
          isAdmin: player.isAdmin,
        };
      });
    },
  },
};
