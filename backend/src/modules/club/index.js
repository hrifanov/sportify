import { typeDef } from './schema';
import * as queries from './query';
import * as mutations from './mutation';
import User from '../../models/User';
import Season from '../../models/Season';
import Match from '../../models/Match';

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
      return Promise.all(parent.players.map(async (player) => {
        const user = await User.findById(player.user).select(
          'id userName name email',
        );

        return {
          ...user.toObject(),
          id: user.id, // id, not _id
          isAdmin: player.isAdmin,
        };
      }));
    },
    async matches(parent) {
      return Match.find({ club: parent.id });
    },
    async seasons(parent) {
      return Season.find({ club: parent.id });
    },
  },
};
