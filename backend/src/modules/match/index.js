import { matchTypeDef } from './schemas/matchSchema';
import { teamPlayerTypeDef } from './schemas/teamPlayerSchema';
import * as queries from './query';
import * as mutations from './mutation';
import Club from '../../models/Club';
import User from '../../models/User';
import Season from '../../models/Season';
import TeamPlayer from '../../models/TeamPlayer';
import formatSeason from '../season/formatSeason';

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
    async season(parent) {
      const season = (await Season.findById(parent.season)).toObject();
      return formatSeason(season);
    }
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
  }
};
