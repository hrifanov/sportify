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
  mutation (
    $id: ID!
    $name: String!
    $sport: String!
    $locality: String!
    $playerId: ID!
    $imageURL: String
  ) {
    editClub(
      editClubInput: {
        id: $id
        name: $name
        sport: $sport
        locality: $locality
        contactPerson: $playerId
        imageURL: $imageURL
      }
    )
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
    $imageURL: String
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

export const EDIT_APLICATION_MUTATION = gql`
  mutation editApplication($applicationId: ID!, $newState: ApplicationState!) {
    editApplication(editApplicationInput: { applicationId: $applicationId, newState: $newState }) {
      id
      user {
        id
        userName
        name
        email
      }
      club {
        id
        name
        sport
        locality
      }
      state
      dateApplied
    }
  }
`;

export const CREATE_APLICATION_MUTATION = gql`
  mutation createApplication($userId: ID!, $clubId: ID!) {
    createClubApplication(applicationInput: { userId: $userId, clubId: $clubId }) {
      id
      user {
        id
        userName
        name
        email
      }
      club {
        id
        name
        sport
        locality
      }
      state
      dateApplied
    }
  }
`;

export const CREATE_TEMPORARY_PLAYER = gql`
  mutation createTemporaryPlayer($clubId: ID!, $name: String!) {
    createTemporaryPlayer(clubId: $clubId, name: $name)
  }
`;
