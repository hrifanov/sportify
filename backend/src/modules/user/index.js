import { typeDef } from './schema';
import * as queries from './query';
import * as mutations from './mutation';
import { getUserStatisticsForMatch, getUserStatisticsForTeam } from "./statistics";
import Club from '../../models/Club';

export { typeDef, resolvers };

const resolvers = {
  Query: {
    ...queries,
  },
  Mutation: {
    ...mutations,
  },
  User: {
    async clubs(user){
      return await Club.find({ players: { $elemMatch: { user: user.id } } });
    },
    async statisticsClub(user, params){
      return await getUserStatisticsForTeam(user.id, params.clubId, params.seasonId)
    },
    async statisticsMatch(user, params){
      return await getUserStatisticsForMatch(user.id, params.matchId);
    }
  }
};
