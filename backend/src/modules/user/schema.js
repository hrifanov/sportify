export const typeDef = /* GraphQL */ `
  extend type Query {
    users: [User!]!
    user(userName: String!): User
  }

  extend type Mutation {
    signin(email: String!, password: String!): AuthInfo!
    signup(
      email: String!
      password: String!
      name: String!
      userName: String!
      profileImageUrl: String
    ): AuthInfo!
  }

  type User {
    id: Int!
    name: String!
    userName: String!
    profileImageUrl: String
    quacks: [Quack!]!
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
