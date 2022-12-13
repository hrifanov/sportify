import { gql } from 'apollo-server-express';

export const typeDef = gql`
    type Query{
        seasons: [Season]!
        season(seasonId: ID!): Season
    }

    type Mutation{
        createSeason(createSeasonInput: CreateSeasonInput): Season!
        deleteSeason(seasonId: ID!): Boolean
    }

    type Season{
        id: ID!
        name: String!
        club: Club!
    }
    
    input CreateSeasonInput{
        name: String!
        club: ID!
    }
`;
