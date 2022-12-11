import { gql } from '@apollo/client';

export const TeamDataFragment = gql`
  fragment TeamData on Team {
    name
    teamPlayers {
      role
      user {
        id
        name
      }
    }
  }
`;

export const TeamsFragment = gql`
  ${TeamDataFragment}
  fragment TeamFields on Match {
    teams {
      home {
        ...TeamData
      }
      guest {
        ...TeamData
      }
    }
  }
`;

export const UserStatisticsFragment = gql`
  fragment UserStatistics on MatchSummary {
    assists
    avgCanadianPoints
    canadianPoints
    gamesGoalkeeper
    gamesAttacker
    gamesTotal
    goals
    goalsSaved
    goalsPassed
    matchesWithoutPassedGoals
    penalties
    totalPenaltiesLength
    roles
    winsTotal
  }
`;
