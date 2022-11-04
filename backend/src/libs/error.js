import { GraphQLError } from 'graphql';

export const throwCustomError = (message, extensions) => {
  throw new GraphQLError(message, {
    extensions: extensions,
  });
};
