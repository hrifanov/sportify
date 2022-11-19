import { typeDef } from './schema';
import * as queries from './query';
import * as mutations from './mutation';
import TeamPlayer from '../../models/TeamPlayer';

export { typeDef, resolvers };

const resolvers = {
  Query: {
    ...queries,
  },
  Mutation: {
    ...mutations,
  },
  Event: {
    async teamPlayer(parent) {
      return await TeamPlayer.findById(parent.teamPlayer);
    },
  },
};
