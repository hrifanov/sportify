import merge from 'lodash.merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDef as User, resolvers as userResolvers } from './user/index';
import { typeDef as Club, resolvers as clubResolvers } from './club/index';
import {
  matchTypeDef as Match,
  teamTypeDef as Team,
  eventTypeDef as Event,
  resolvers as matchResolvers,
} from './match/index';

export const schema = makeExecutableSchema({
  typeDefs: [User, Club, Match, Team, Event],
  resolvers: merge(userResolvers, clubResolvers, matchResolvers),
});
