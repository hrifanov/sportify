import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Query {
    clubs(filter: Filter): [Club!]!
    clubByContactPerson(contactPersonId: ID!): Club
    clubByID(id: ID!): Club
  }

  type Mutation {
    createClub(clubInput: ClubInput!): ID!
    editClub(editClubInput: EditClubInput): Boolean!
    deleteClub(clubId: ID!): Boolean!
    invitePlayer(clubId: ID!, email: String!): Boolean!
    acceptInvite(token: String!): Boolean!
    setClubAdminStatus(clubId: ID!, userId: ID!, isAdmin: Boolean!): Boolean!
    removePlayer(clubId: ID!, userId: ID!): Boolean!
    createTemporaryPlayer(clubId: ID!, name: String!): Boolean!
  }

  type Club {
    id: ID!
    name: String!
    sport: String!
    locality: String!
    players: [Player]
    contactPerson: User!
    imageURL: String
    seasons: [Season]
    matches: [Match]
    playerStatistics(seasonId: ID!): [PlayerStatistic]!
  }

  input ClubInput {
    name: String!
    sport: String!
    locality: String!
    contactPerson: ID!
    imageURL: String
  }

  input EditClubInput {
    id: ID!
    name: String
    sport: String
    locality: String
    players: [PlayerInput]
    contactPerson: ID
    imageURL: String
  }

  type Player {
    id: ID!
    userName: String
    name: String!
    email: String
    isAdmin: Boolean
  }

  input PlayerInput {
    user: ID!
    isAdmin: Boolean!
  }

  input Filter {
    param: String!
    value: String!
    exact: Boolean
  }

  type PlayerStatistic{
    user: User!
    statistics: MatchSummary!
  }
`;
