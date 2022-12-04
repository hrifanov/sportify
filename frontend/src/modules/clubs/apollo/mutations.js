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
  mutation createClub(
    $name: String!
    $sport: String!
    $locality: String!
    $playerId: ID!
    $imageURL: String!
  ) {
    createClub(
      clubInput: {
        name: $name
        sport: $sport
        locality: $locality
        contactPerson: $playerId
        imageURL: $imageURL
      }
    )
  }
`;

export const CREATE_SEASON_MUTATION = gql`
  mutation createClub($name: String!, $club: ID!) {
    createSeason(createSeasonInput: { name: $name, club: $club }) {
      id
      name
    }
  }
`;

export const DELETE_CLUB_MUTATION = gql`
  mutation deleteClub($clubId: ID!) {
    deleteClub(clubId: $clubId)
  }
`;

export const DELETE_SEASON_MUTATION = gql`
  mutation deleteSeason($seasonId: ID!) {
    deleteSeason(seasonId: $seasonId)
  }
`;
