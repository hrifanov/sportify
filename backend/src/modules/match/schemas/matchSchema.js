import { gql } from 'apollo-server-express';

export const matchTypeDef = gql`
  type Query {
    match(matchId: ID!): Match
    matches(clubId: ID!): [Match]
  }

  type Mutation {
    createMatch(matchInput: MatchInput): Match!
  }

  # MATCH

  type Match {
    id: ID!
    date: String!
    timer: Int!
    club: Club
    place: String
    teams: MatchTeams
    events: [Event]!
    score: TeamsNumbers!
    shots: TeamsNumbers!
    season: Season!
  }

  input MatchInput {
    club: ID!
    date: String!
    place: String
    teams: InputMatchTeams
    timer: Int
    score: TeamsNumbersInput
    shots: TeamsNumbersInput,
    seasonId: ID!
  }

  # MATCH TEAMS

  type MatchTeams {
    home: Team!
    guest: Team!
  }

  input InputMatchTeams {
    home: TeamInput!
    guest: TeamInput!
  }

  type Team {
    id: ID!
    name: String!
    teamPlayers: [TeamPlayer]!
  }

  input TeamInput {
    name: String!
    teamPlayers: [TeamPlayerInput]!
  }

  type TeamsNumbers {
    home: Int!
    guest: Int!
  }

  input TeamsNumbersInput{
    home: Int!
    guest: Int!
  }
`;
