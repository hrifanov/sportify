import { gql } from '@apollo/client';

export const CREATE_MATCH_MUTATION = gql`
  mutation createMatch($matchInput: MatchInput) {
    createMatch(matchInput: $matchInput)
  }
`;
