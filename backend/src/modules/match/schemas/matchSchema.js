import { gql } from 'apollo-server-express';

export const matchTypeDef = gql`
  type Query {
    match(matchId: ID!): Match
    matches(clubId: ID!): [Match]
  }

  type Mutation {
    createMatch(matchInput: MatchInput): Match!
    editMatch(editMatchInput: EditMatchInput): Boolean!
    removeMatch(matchId: ID): Boolean!
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
    statistics: [MatchUserStatistics]
  }
  
  type MatchUserStatistics {
    user: User
    teamId: String
    statistics: MatchSummary
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
    events: [EventInput]!
  }
  
  input EditMatchInput {
    matchId: ID!
    timer: Int!
    score: TeamsNumbersInput!
    shots: TeamsNumbersInput!
    deletedEvents: [EventInput]
    modifiedEvents: [EventInput]
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
