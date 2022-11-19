import { gql } from 'apollo-server-express';

export const teamPlayerTypeDef = gql`
  type TeamPlayer {
    id: ID!
    user: User!
    role: String!
  }

  input TeamPlayerInput {
    user: ID!
    role: String!
  }
`;
