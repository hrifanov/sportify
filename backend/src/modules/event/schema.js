import { gql } from 'apollo-server-express';
import { EventDataScalar } from './eventDataScalar';

export const typeDef = gql`
  type Query {
    events(matchId: ID!): [Event]
  }

  type Mutation {
    addEvent(matchId: ID!, eventInput: EventInput!): Boolean!
    editEvent(eventId: ID!, eventEditInput: EventEditInput!): Boolean!
    removeEvent(matchId: ID!, eventId: ID!): Boolean!
  }

  # EVENTS

  type Event {
    id: ID!
    type: String!
    time: String!
    data: EventData!
  }

  input EventInput {
    type: String!
    time: String!
    data: EventData!
  }

  input EventEditInput {
    type: String
    time: String
    data: EventData!
  }

  scalar EventData
`;
