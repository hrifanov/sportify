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
  User: {
    async quacks(parent, _, { dbConnection }) {
      return await dbConnection.query(`SELECT * FROM quack WHERE userId = ?`, [
        parent.id,
      ]);
    },
  },
};
