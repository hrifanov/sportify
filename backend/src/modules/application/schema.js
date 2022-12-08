import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Query {
    applications(clubId: ID!): [Application]!
  }

  type Mutation {
    createClubApplication(applicationInput: ClubApplicationInput!): Application!
    editApplication(editApplicationInput: EditApplicationInput!): Application!
    approveApplication(applicationToken: String!): Application!
  }

  type Application {
    id: ID!
    user: User!
    club: Club!
    state: ApplicationState!
    dateApplied: String!
  }

  enum ApplicationState {
    accepted,
    declined,
    pending
  }

  input ClubApplicationInput {
    userId: ID!
    clubId: ID!
  }

  input EditApplicationInput {
    applicationId: ID!
    newState: ApplicationState!
  }
`;