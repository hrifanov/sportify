import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Query {
    user(userName: String!): User
    users: [User!]!
  }

  type User {
    id: ID!
    userName: String!
    password: String!
    name: String!
    email: String!
    tokenSum: Int!
  }

  input UserInput {
    userName: String!
    password: String!
    name: String!
    email: String!
    profileImageUrl: String
  }

  type Mutation {
    #deleteUser(username: String!, password: String!): Boolean!
    signin(userName: String!, password: String!): LoginResponse!
    signup(userInput: UserInput!): Boolean!
    invalidateTokens: Boolean!
  }

  type LoginResponse {
    accessToken: String!
    user: User!
  }
`;
