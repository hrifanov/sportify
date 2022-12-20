import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Query {
    user(userName: String!): User
    users: [User!]!
    invitationDetail(token: String!): InvitationInfo
  }

  type Mutation {
    signin(userName: String!, password: String!): LoginResponse!
    signup(userInput: UserInput!): Boolean!
    verifyUser(token: String!): Boolean!
    refreshToken(token: String!): RefreshTokenResponse!
    invalidateTokens: Boolean!
    forgottenPassword(username: String!): Boolean!
    resetPassword(token: String!, password: String!): Boolean!
  }

  type User {
    id: ID!
    userName: String
    name: String!
    email: String
    statisticsClub(clubId: ID!, seasonId: ID!): MatchSummary!
    statisticsMatch(matchId: ID!): MatchSummary!
    clubs: [Club]
  }

  input UserInput {
    userName: String!
    password: String!
    name: String!
    email: String!
  }

  type LoginResponse {
    accessToken: String!
    user: User!
  }

  type RefreshTokenResponse {
    accessToken: String!
  }

  type InvitationInfo {
    club: Club
    email: String
    doesUserExist: Boolean
  }

  type MatchSummary {
    assists: Int!
    avgCanadianPoints: Float!
    canadianPoints: Int!
    draws: Int!
    gamesGoalkeeper: Int!
    gamesAttacker: Int!
    gamesTotal: Int!
    goals: Int!
    goalsSaved: Int!
    goalsPassed: Int!
    matchesWithoutPassedGoals: Int!
    penalties: Int!
    totalPenaltiesLength: Float!
    roles: [String]!
    winsTotal: Int!
  }
`;
