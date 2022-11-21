import { gql } from '@apollo/client';

export const FETCH_CLUBS = gql`
  query {
    clubs {
      id
      name
      sport
      locality
    }
  }
`;

export const FETCH_MATCHES = gql`
  query {
    matches(clubId: "636ecd9840d0be5c9a93e4f2") {
      date
      teams {
        home {
          name
        }
        guest {
          name
        }
      }
    }
  }
`;
console.log(FETCH_CLUBS);
