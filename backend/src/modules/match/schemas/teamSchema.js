import { gql } from 'apollo-server-express';

export const teamTypeDef = gql`
  type MatchTeams {
    home: Team
    guest: Team
  }

  input InputMatchTeams {
    home: TeamInput
    guest: TeamInput
  }

  type Team {
    id: ID!
    name: String!
    teamPlayers: [TeamPlayer!]!
  }

  input TeamInput {
    name: String!
    teamPlayers: [TeamPlayerInput!]!
  }

  # PLAYERS

  type TeamPlayer {
    id: ID!
    user: User!
    role: String!
  }

  input TeamPlayerInput {
    user: ID!
    role: String!
  }
`;
