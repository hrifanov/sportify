import { gql } from '@apollo/client';

export const INVITE_PLAYER_MUTATION = gql`
  mutation invitePlayer($clubId: ID!, $email: String!) {
    invitePlayer(clubId: $clubId, email: $email)
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

export const CREATE_CLUB_MUTATION = gql`
  mutation createClub($name: String!, $sport: String!, $locality: String!, $playerId: ID!) {
    createClub(clubInput: { name: $name, sport: $sport, locality: $locality, owner: $playerId })
  }
`;

export const CREATE_SEASON_MUTATION = gql`
  mutation createClub($name: String!, $dateStart: String!, $dateEnd: String!) {
    createSeason(createSeasonInput: { name: $name, dateStart: $dateStart, dateEnd: $dateEnd }) {
      id
      name
      dateStart
      dateEnd
    }
  }
`;
