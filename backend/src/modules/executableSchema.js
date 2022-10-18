import merge from 'lodash.merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import mockResolver from '../__mocks__/mockResolver';
import { MOCKS } from '../config/variables';
import { typeDef as User, resolvers as userResolvers } from './user/index';

const resolvers = {};

export const schema = makeExecutableSchema({
  typeDefs: [User],
  resolvers: merge(resolvers, userResolvers),
});
