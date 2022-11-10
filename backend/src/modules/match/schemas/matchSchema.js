import { gql } from 'apollo-server-express';

export const matchTypeDef = gql`
  type Query {
    match(matchId: ID!): Match
    matches(clubId: ID!): [Match]
  }

  type Mutation {
    createMatch(matchInput: MatchInput): ID!
  }

  # MATCH

  type Match {
    id: ID!
    club: Club
    date: String!
    teams: MatchTeams!
    events: [Event]
  }

  input MatchInput {
    club: ID!
    date: String!
    teams: InputMatchTeams!
  }
`;
