import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Query {
    events(matchId: ID!): [Event]
  }

  type Mutation {
    addEvent(matchId: ID!, eventInput: EventInput!): ID!
    editEvent(eventId: ID!, eventEditInput: EventEditInput!): Boolean!
    removeEvent(matchId: ID!, eventId: ID!): Boolean!
  }

  # EVENTS

  type Event {
    id: ID!
    type: String!
    time: Int!
    data: EventData!
  }

  input EventInput {
    id: ID
    type: String!
    time: Int!
    data: EventData!
  }

  input EventEditInput {
    type: String
    time: Int
    data: EventData!
  }

  scalar EventData
`;
