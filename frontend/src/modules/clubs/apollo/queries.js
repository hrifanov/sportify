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
        email
        isAdmin
      }
    }
    matches(clubId: "636ecd9840d0be5c9a93e4f2") {
      id
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

export const INVITATION_DETAIL_QUERY = gql`
  query invitationDetail($token: String!) {
    invitationDetail(token: $token) {
      clubName
      email
      doesUserExist
    }
  }
`;
