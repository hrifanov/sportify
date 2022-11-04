import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Query {
    user(userName: String!): UserOutput
    users: [UserOutput!]!
  }

  type User {
    id: ID!
    userName: String!
    password: String!
    name: String!
    email: String!
    tokenVersion: Int!
    verified: Boolean!
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
    verifyUser(token: String!): Boolean!
    refreshToken(token: String!): RefreshTokenResponse!
    invalidateTokens: Boolean!
  }

  type UserOutput {
    id: ID!
    userName: String!
    name: String!
    email: String!
    profileImageUrl: String
    verified: Boolean
  }

  type LoginResponse {
    accessToken: String!
    user: User!
  }

  type RefreshTokenResponse {
    accessToken: String!
  }
`;
