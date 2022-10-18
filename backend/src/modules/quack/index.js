import { typeDef } from './schema';
import * as queries from './query';
import * as mutations from './mutation';

export { typeDef, resolvers };

const resolvers = {
  Query: {
    ...queries,
  },
  Mutation: {
    ...mutations,
  },
  Quack: {
    async user(parent, _, { dbConnection }) {
      return (
        await dbConnection.query(`SELECT * FROM user WHERE id = ?`, [
          parent.userId,
        ])
      )[0];
    },
  },
};
