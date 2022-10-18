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
    signin(email: String!, password: String!): AuthInfo!
    signup(userInput: UserInput!): AuthInfo! 
  }

  type AuthUser {
    id: Int!
    name: String!
    userName: String!
    profileImageUrl: String
  }

  type AuthInfo {
    user: AuthUser!
    token: String!
  }
`;
