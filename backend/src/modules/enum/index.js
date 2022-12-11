import { typeDef } from './schema';
import * as queries from './query';

export { typeDef, resolvers };

const resolvers = {
  Query: {
    ...queries,
  },
};
