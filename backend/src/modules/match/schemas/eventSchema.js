import { gql } from 'apollo-server-express';

export const eventTypeDef = gql`
  type Query {
    events(matchId: ID!): [Event]
  }

  type Mutation {
    addEvent(eventInput: EventInput!): Boolean!
  }

  # EVENTS

  type Event {
    id: ID!
    type: String!
    time: String!
    teamPlayer: User!
    value: String
  }

  input EventInput {
    type: String!
    time: String!
    teamPlayer: ID!
    value: String
  }
`;
