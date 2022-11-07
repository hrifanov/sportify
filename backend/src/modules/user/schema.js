import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Query {
    user(userName: String!): UserOutput
    users: [UserOutput!]!
    doesInvitationUserExist(token: String!): Boolean
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
  }

  type Mutation {
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
