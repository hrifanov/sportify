import { gql } from '@apollo/client';

export const FETCH_CLUBS = gql`
  query {
    clubs {
      id
      name
      sport
      locality
      players {
        id
        name
      }
    }
  }
`;
