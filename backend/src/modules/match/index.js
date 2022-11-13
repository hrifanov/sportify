import { matchTypeDef } from './schemas/matchSchema';
import { teamTypeDef } from './schemas/teamSchema';
import { eventTypeDef } from './schemas/eventSchema';
import * as queries from './query';
import * as mutations from './mutation';
import Club from '../../models/Club';
import User from '../../models/User';

export { matchTypeDef, teamTypeDef, eventTypeDef, resolvers };

const resolvers = {
  Query: {
    ...queries,
  },
  Mutation: {
    ...mutations,
  },
  Match: {
    async club(parent) {
      return Club.findById(parent.club);
    },
  },
  TeamPlayer: {
    async user(parent) {
      return User.findById(parent.user);
    },
  },
  Event: {
    async TeamPlayer(parent) {
      return User.findById(parent.TeamPlayer);
    },
  },
};
