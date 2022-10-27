import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Query {
    clubs: [Club!]!
    club_by_owner(owner_id: ID!): Club
    club_by_id(id: ID!): Club
  }

  type Club {
    id: ID!
    name: String!
    sport: String!
    locality: String!
    owner: User!
  }
`;
