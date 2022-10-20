const { gql } = require('apollo-server-express');

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
    tokenCheckSum: Int #TODO: mandatory
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
    signin(userName: String!, password: String!): AuthInfo!
    signup(userInput: UserInput!): AuthInfo!
  }

  type AuthUser {
    id: ID!
    userName: String!
    email: String!
    name: String!
    profileImageUrl: String
  }

  type AuthInfo {
    user: AuthUser!
    accessToken: String!
    refreshToken: String!
  }
`;
