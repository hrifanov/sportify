import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Query {
    user(userName: String!): User
    users: [User!]!
    invitationDetail(token: String!): InvitationInfo
  }

  type Mutation {
    signin(userName: String!, password: String!): LoginResponse!
    signup(userInput: UserInput!): Boolean!
    verifyUser(token: String!): Boolean!
    refreshToken(token: String!): RefreshTokenResponse!
    invalidateTokens: Boolean!
  }

  type User {
    id: ID!
    userName: String!
    name: String!
    email: String!
  }

  input UserInput {
    userName: String!
    password: String!
    name: String!
    email: String!
  }

  type LoginResponse {
    accessToken: String!
    user: User!
  }

  type RefreshTokenResponse {
    accessToken: String!
  }

  type InvitationInfo {
    clubName: String
    email: String
    doesUserExist: Boolean
  }
`;
