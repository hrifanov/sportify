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
    async owner(parent) {
      return User.findById(parent.owner);
    },
    async players(parent) {
      return parent.players.map((userId) => User.findById(userId));
    },
  },
};
