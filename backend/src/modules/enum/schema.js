import { gql } from 'apollo-server-express';

export const typeDef = gql`
  scalar JSON
  
  type Query {
    enums: Enum!
  }
  
  type Enum {
    goalTypes: JSON
    penaltyLengths: JSON
    penaltyTypes: JSON
  }
`
