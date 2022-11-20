import { gql } from '@apollo/client';

export const INVITE_PLAYER_MUTATION = gql`
  mutation invitePlayer($clubID: ID!, $email: String!) {
    invitePlayer(clubId: $clubID, email: $email)
  }
`;

export const ACCEPT_INVITE_MUTATION = gql`
  mutation acceptInvite($token: String!) {
    acceptInvite(token: $token)
  }
`;

export const EDIT_CLUB_MUTATION = gql`
  mutation editClub($clubId: ID!, $name: String!, $locality: String!) {
    editClub(clubId: $clubId, name: $name, locality: $locality)
  }
`;

export const REMOVE_PLAYER_MUTATION = gql`
  mutation removePlayer($clubId: ID!, $userId: ID!) {
    removePlayer(clubId: $clubId, userId: $userId)
  }
`;

export const SET_CLUB_ADMIN_STATUS = gql`
  mutation setClubAdminStatus($clubId: ID!, $userId: ID!, $isAdmin: Boolean!) {
    setClubAdminStatus(clubId: $clubId, userId: $userId, isAdmin: $isAdmin)
  }
`;
