const { gql } = require('apollo-server-express');

export const typeDef = gql`
  type Query {
      user(userName: String!): User
      users: [User!]!
    }

  type User {
    _ID: String!
    userName: String!
    password: String!
    name: String!
    email: String!
    count: Int
    profileImageUrl: String
  }

  input UserInput {
    userName: String!
    password: String!
    name: String! 
    email: String! 
    profileImageUrl: String
    }

  type Mutation {
    deleteUser(ID: ID!): Boolean!
    signin(userName: String!, password: String!): AuthInfo!
    signup(userInput: UserInput!): AuthInfo! 
  }

  type AuthUser {
    id: Int!
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
