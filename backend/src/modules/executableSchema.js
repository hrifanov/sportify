import merge from 'lodash.merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import mockResolver from '../__mocks__/mockResolver';
import { MOCKS } from '../config/variables';
import { typeDef as Quack, resolvers as quackResolvers } from './quack/index';
import { typeDef as User, resolvers as userResolvers } from './user/index';

// based on - https://www.apollographql.com/blog/backend/schema-design/modularizing-your-graphql-schema-code/
const Query = /* GraphQL */ `
  type Query {
    _empty: String
  }
`;

const Mutation = /* GraphQL */ `
  type Mutation {
    _empty(nothing: String): String
  }
`;

const resolvers = {};

export const schema = makeExecutableSchema({
  typeDefs: [Query, Mutation, Quack, User],
  resolvers: MOCKS
    ? mockResolver
    : merge(resolvers, quackResolvers, userResolvers),
});
