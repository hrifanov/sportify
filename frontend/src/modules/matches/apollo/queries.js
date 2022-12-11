import { gql } from '@apollo/client';
import { TeamsFragment, UserStatisticsFragment } from 'src/modules/matches/apollo/fragments';

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

export const FETCH_MATCH = gql`
  ${TeamsFragment}
  ${UserStatisticsFragment}
  query fetchMatch($matchId: ID!) {
    match(matchId: $matchId) {
      ...TeamFields
      id
      date
      timer
      club {
        id
      }
      events {
        id
        type
        time
        data
      }
      score {
        home
        guest
      }
      shots {
        home
        guest
      }
      season {
        id
        name
      }
      statistics {
        user {
          name
        }
        teamId
        statistics {
          ...UserStatistics
        }
      }
    }
  }
`;

export const FETCH_ENUMS = gql`
  query {
    enums {
      goalTypes
      penaltyTypes
      penaltyLengths
    }
  }
`;
