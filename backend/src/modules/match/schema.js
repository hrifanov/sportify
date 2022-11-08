import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Match {
    id: ID!
    club: Club!
    teams: MatchTeams!
    date: String!
    events: [Event]!
  }

  type MatchTeams {
    home: [Team]
    guest: [Team]
  }

  type Team {
    name: String!
    players: [Player]!
  }

  type Event {
    type: String!
    time: String!
  }

  type Player {
    player: User!
    role: String!
  }
`;