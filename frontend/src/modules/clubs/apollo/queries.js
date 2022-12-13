import { gql } from '@apollo/client';
import { UserStatisticsFragment } from 'src/modules/matches/apollo/fragments';

export const FETCH_CLUBS = gql`
  query clubs($param: String!, $value: String!, $exact: Boolean) {
    clubs(filter: { param: $param, value: $value, exact: $exact }) {
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
      seasons {
        id
        name
      }
    }
  }
`;

export const CLUB_STATISTICS_QUERY = gql`
  ${UserStatisticsFragment}
  query clubStatistics($clubId: ID!, $seasonId: ID!) {
    clubByID(id: $clubId) {
      playerStatistics(seasonId: $seasonId) {
        user {
          name
        }
        statistics {
          ...UserStatistics
        }
      }
    }
  }
`;

export const CLUB_APPLICATIONS_QUERY = gql`
  query applications($clubId: ID!) {
    applications(clubId: $clubId) {
      id
      user {
        id
        userName
        name
        email
      }
      club {
        id
        name
      }
      state
      dateApplied
    }
  }
`;

export const USER_QUERY = gql`
  query user($userName: String!) {
    user(userName: $userName) {
      id
      userName
      name
      clubs {
        id
        name
        sport
        locality
        imageURL
      }
    }
  }
`;

export const DISTRICTS_QUERY = gql`
  query {
    enums {
      districts
    }
  }
`;
