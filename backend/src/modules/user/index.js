import { typeDef } from './schema';
import * as queries from './query';
import * as mutations from './mutation';
import { getUserStatisticsForMatch } from "./statistics";

export { typeDef, resolvers };

const resolvers = {
  Query: {
    ...queries,
  },
  Mutation: {
    ...mutations,
  },
  User: {
    async statisticsClub(user, params, context){
      
    },
    async statisticsMatch(user, params, context){
      return await getUserStatisticsForMatch(user, params, context);
    }
  }
};
