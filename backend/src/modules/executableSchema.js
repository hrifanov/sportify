import merge from 'lodash.merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDef as User, resolvers as userResolvers } from './user/index';
import { typeDef as Club, resolvers as clubResolvers } from './club/index';
import { typeDef as Match, resolvers as matchResolvers } from './match/index';

export const schema = makeExecutableSchema({
  typeDefs: [User, Club, Match],
  resolvers: merge(userResolvers, clubResolvers, matchResolvers),
});
