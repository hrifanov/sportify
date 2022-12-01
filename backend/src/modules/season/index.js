import { typeDef } from './schema';
import * as queries from './query';
import * as mutations from './mutation';
import Club from '../../models/Club.js';

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
      console.log({parent});
      return Club.findById(parent.club);
    },
  },
};
