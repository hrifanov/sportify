import merge from 'lodash.merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDef as User, resolvers as userResolvers } from './user/index';
import { typeDef as Club, resolvers as clubResolvers } from './club/index';
import {
  matchTypeDef as Match,
  teamPlayerTypeDef as TeamPlayer,
  resolvers as matchResolvers,
} from './match/index';
import { typeDef as Event, resolvers as eventResolvers } from './event/index';

export const schema = makeExecutableSchema({
  typeDefs: [User, Club, Match, TeamPlayer, Event],
  resolvers: merge(
    userResolvers,
    clubResolvers,
    matchResolvers,
    eventResolvers
  ),
});
