import { matchTypeDef } from './schemas/matchSchema';
import { teamPlayerTypeDef } from './schemas/teamPlayerSchema';
import * as queries from './query';
import * as mutations from './mutation';
import Club from '../../models/Club';
import User from '../../models/User';
import TeamPlayer from '../../models/TeamPlayer';

export { matchTypeDef, teamPlayerTypeDef, resolvers };

const resolvers = {
  Query: {
    ...queries,
  },
  Mutation: {
    ...mutations,
  },
  Match: {
    async club(parent) {
      return await Club.findById(parent.club);
    },
  },
  Team: {
    async teamPlayers(parent) {
      return await TeamPlayer.find({ _id: { $in: parent.teamPlayers } });
    },
  },
  TeamPlayer: {
    async user(parent) {
      return await User.findById(parent.user);
    },
  },
};
