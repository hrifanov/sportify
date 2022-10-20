import merge from 'lodash.merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDef as User, resolvers as userResolvers } from './user/index';

export const schema = makeExecutableSchema({
  typeDefs: [User],
  resolvers: merge(userResolvers),
});
