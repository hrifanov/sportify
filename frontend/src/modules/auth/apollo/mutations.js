import { gql } from '@apollo/client';

export const SIGN_IN_MUTATION = gql`
  mutation signin($userName: String!, $password: String!) {
    signin(userName: $userName, password: $password) {
      accessToken
      user {
        name
        userName
        email
        id
      }
    }
  }
`;

export const SIGN_UP_MUTATION = gql`
  mutation signup($userName: String!, $password: String!, $name: String!, $email: String!) {
    signup(userInput: { userName: $userName, password: $password, name: $name, email: $email })
  }
`;

export const VERIFY_ACCOUNT_MUTATION = gql`
  mutation verifyUser($token: String!) {
    verifyUser(token: $token)
  }
`;

export const REFRESH_TOKEN = gql`
  mutation refreshToken($token: String!) {
    refreshToken(token: $token) {
      accessToken
    }
  }
`;
