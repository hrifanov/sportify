import { gql } from '@apollo/client';

const TeamFragment = gql`
  fragment TeamFields on Team {
    name
    teamPlayers {
      id
      role
      user {
        name
      }
    }
  }
`;

export const CREATE_MATCH_MUTATION = gql`
  ${TeamFragment}
  mutation createMatch($matchInput: MatchInput) {
    createMatch(matchInput: $matchInput) {
      id
      teams {
        home {
          ...TeamFields
        }
        guest {
          ...TeamFields
        }
      }
    }
  }
`;

export const ADD_EVENT_MUTATION = gql`
  mutation addEvent($matchId: ID!, $eventInput: EventInput!) {
    addEvent(matchId: $matchId, eventInput: $eventInput)
  }
`;

export const EDIT_EVENT_MUTATION = gql`
  mutation editEvent($eventId: ID!, $eventEditInput: EventEditInput!) {
    editEvent(eventId: $eventId, eventEditInput: $eventEditInput)
  }
`;

export const REMOVE_EVENT_MUTATION = gql`
  mutation removeEvent($matchId: ID!, $eventId: ID!) {
    removeEvent(matchId: $matchId, eventId: $eventId)
  }
`;
