import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Query {
    clubs: [Club!]!
    club_by_owner(owner_id: ID!): Club
    club_by_id(id: ID!): Club
  }

  type Mutation {
    createClub(clubInput: ClubInput!): ID!
    editClub(clubId: ID!, name: String, locality: String): Boolean!
    invitePlayer(clubId: ID!, email: String!): Boolean!
    acceptInvite(token: String!): Boolean!
    setClubAdminStatus(clubId: ID!, userId: ID!, isAdmin: Boolean!): Boolean!
    removePlayer(clubId: ID!, userId: ID!): Boolean!
  }

  type Club {
    id: ID!
    name: String!
    sport: String!
    locality: String!
    players: [Player]
    owner: User!
  }

  input ClubInput {
    name: String!
    sport: String!
    locality: String!
    players: [PlayerInput]
    owner: ID!
  }

  type Player {
    id: ID!
    userName: String!
    name: String!
    email: String!
    isAdmin: Boolean
  }

  input PlayerInput {
    user: ID!
    isAdmin: Boolean!
  }
`;
