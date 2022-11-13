import { gql } from 'apollo-server-express';

export const eventTypeDef = gql`
  type Query {
    events(matchId: ID!): [Event]
  }

  type Mutation {
    addEvent(matchId:ID!, eventInput: EventInput!): Boolean!
  }

  # EVENTS

  type Event {
    id: ID!
    type: String!
    time: String!
    TeamPlayer: User!
    value: Int
  }

  input EventInput {
    type: String!
    time: String!
    TeamPlayer: ID!
    value: Int
  }
`;
