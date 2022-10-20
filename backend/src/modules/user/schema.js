const { gql } = require('apollo-server-express');

export const typeDef = gql`
  type Query {
      user(userName: String!): User
      users: [User!]!
    }

  type User {
    id: String!
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
    #deleteUser(username: String!, password: String!): Boolean!
    signin(userName: String!, password: String!): AuthInfo!
    signup(userInput: UserInput!): AuthInfo! 
  }

  type AuthUser {
    id: String!
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
