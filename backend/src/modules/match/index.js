import { typeDef } from './schema';
import * as queries from './query';
import * as mutations from './mutation';
import Club from '../../models/Club';


export { typeDef, resolvers };

const resolvers = {
  Query: {
    ...queries,
  },
  Mutation: {
    ...mutations,
  },
  Match: {
    async club(parent) {
      return Club.findById(parent.clubId);
    },
  },
};
