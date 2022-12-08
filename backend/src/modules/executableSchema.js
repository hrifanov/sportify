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
import { typeDef as Season, resolvers as seasonResolvers } from './season/index';
import { typeDef as Application, resolvers as applicationResolvers } from './application';

export const schema = makeExecutableSchema({
  typeDefs: [User, Club, Match, TeamPlayer, Event, Season, Application],
  resolvers: merge(
    userResolvers,
    clubResolvers,
    matchResolvers,
    eventResolvers,
    seasonResolvers,
    applicationResolvers
  ),
});
