import { gql } from '@apollo/client';
import { UserStatisticsFragment } from 'src/modules/matches/apollo/fragments';

export const FETCH_CLUBS = gql`
  query {
    clubs {
      id
      name
      sport
      imageURL
      locality
      players {
        id
        name
        email
        isAdmin
      }
      contactPerson {
        id
        userName
        name
        email
      }
    }
  }
`;

export const INVITATION_DETAIL_QUERY = gql`
  query invitationDetail($token: String!) {
    invitationDetail(token: $token) {
      club {
        id
        name
      }
      email
      doesUserExist
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

export const CLUB_BY_ID_QUERY = gql`
  ${UserStatisticsFragment}
  query clubByID($id: ID!) {
    clubByID(id: $id) {
      id
      name
      sport
      locality
      imageURL
      players {
        id
        userName
        name
        email
        isAdmin
      }
      contactPerson {
        id
        userName
        name
        email
      }
      # imageURL tohle musí mít všechny kluby, nebo být nullable
      seasons {
        id
        name
        statistics {
          user {
            name
          }
          statistics {
            ...UserStatistics
          }
        }
      }
      matches {
        id
        date
        score {
          home
          guest
        }
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
  }
`;
