import { typeDef } from "./schema";
import * as queries from "./query";
import * as mutations from "./mutation";
import User from "../../models/User";
import Club from "../../models/Club";

const resolvers = {
  Query: {
    ...queries
  },
  Mutation: {
    ...mutations
  },
  Application: {
    async user(parent) {
      return await User.findById(parent.user);
    },
    async club(parent) {
      return await Club.findById(parent.club);
    },
    dateApplied(parent) {
      return parent.dateApplied.toISOString();
    }
  }
}

export { typeDef, resolvers };