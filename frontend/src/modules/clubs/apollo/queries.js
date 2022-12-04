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
      date
      score {
        home
        guest
      }
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

    clubByID(id: "636ecd9840d0be5c9a93e4f2") {
      players {
        id
        name
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
