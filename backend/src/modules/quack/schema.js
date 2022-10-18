export const typeDef = /* GraphQL */ `
  extend type Query {
    quacks: [Quack!]!
  }

  extend type Mutation {
    addQuack(userId: Int!, text: String!): Quack!
  }

  type Quack {
    id: Int!
    createdAt: String!
    user: User!
    userId: Int!
    text: String!
  }
`;
