import { gql } from '@apollo/client';

export const SIGN_IN_MUTATION = gql`
  mutation signin($username: String!, $password: String!) {
    signin(userName: $username, password: $password) {
      accessToken
      user {
        name
        email
        id
      }
    }
  }
`;

export const SIGN_UP_MUTATION = gql`
  mutation signup(
    $userName: String!
    $password: String!
    $name: String!
    $email: String!
  ) {
    signup(
      userInput: {
        userName: $userName
        password: $password
        name: $name
        email: $email
      }
    )
  }
`;
