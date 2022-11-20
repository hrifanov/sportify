import ClubEditTemplate from 'src/modules/clubs/templates/ClubEditTemplate';
import { FETCH_CLUBS } from 'src/modules/clubs/apollo/queries';
import { useQuery } from '@apollo/client';
import {
  INVITE_PLAYER_MUTATION,
  EDIT_CLUB_MUTATION,
  REMOVE_PLAYER_MUTATION,
  SET_CLUB_ADMIN_STATUS,
} from 'src/modules/clubs/apollo/mutations';
import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';

export default function ClubEditPage() {
  const { data, loading } = useQuery(FETCH_CLUBS);
  const club = data?.clubs?.[0];
  const clubRQ = { club, loading };

  //** Request for inviting a player */
  const [isInvitePlayerCompleted, setIsInvitePlayerCompleted] = useState(false);
  const [emailFromInvitation, setEmailForInvitation] = useState('');

  const [invitePlayerRequest, invitePlayerRequestState] = useMutation(INVITE_PLAYER_MUTATION, {
    onCompleted: (variables) => {
      setIsInvitePlayerCompleted(true);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleSubmitInvitePlayer = useCallback(
    (variables) => {
      invitePlayerRequest({ variables });
      setEmailForInvitation(variables.email);
    },
    [invitePlayerRequest],
  );

  //** Request for editing the club */
  const [isEditClubRequestCompleted, setIsEditClubRequestCompleted] = useState(false);

  const [editClubRequest, editClubRequestState] = useMutation(EDIT_CLUB_MUTATION, {
    onCompleted: () => {
      setIsEditClubRequestCompleted(true);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleSubmitEditClub = useCallback(
    (variables) => {
      editClubRequest({ variables });
    },
    [editClubRequest],
  );

  //** Request for removing a player */
  // const [isEditClubRequestCompleted, setIsEditClubRequestCompleted] = useState(false);

  const [removePlayerRequest, removePlayerRequestState] = useMutation(REMOVE_PLAYER_MUTATION, {
    onCompleted: () => {
      // setIsEditClubRequestCompleted(true);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleSubmitRemovePlayer = useCallback(
    (variables, setDisplayPlayer) => {
      removePlayerRequest({ variables });
      setDisplayPlayer(false);
    },
    [removePlayerRequest],
  );

  //** Request for makink a player a admin */
  // const [isEditClubRequestCompleted, setIsEditClubRequestCompleted] = useState(false);

  const [makePlayerAdminRequest, makePlayerAdminRequestState] = useMutation(SET_CLUB_ADMIN_STATUS, {
    onCompleted: () => {
      // setIsEditClubRequestCompleted(true);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleSubmitmakePlayerAdmin = useCallback(
    (variables) => {
      makePlayerAdminRequest({ variables });
    },
    [makePlayerAdminRequest],
  );

  return (
    <ClubEditTemplate
      clubRQ={clubRQ}
      invitePlayerRQ={{
        loading: invitePlayerRequestState.loading,
        error: invitePlayerRequestState.error,
        onSubmit: handleSubmitInvitePlayer,
        isCompleted: isInvitePlayerCompleted,
        setIsCompleted: setIsInvitePlayerCompleted,
        emailFromInvitation: emailFromInvitation,
      }}
      editClubRQ={{
        onSubmit: handleSubmitEditClub,
        loading: editClubRequestState.loading,
        error: editClubRequestState.error,
        isCompleted: isEditClubRequestCompleted,
        setIsCompleted: setIsEditClubRequestCompleted,
      }}
      removePlayerRQ={{
        onSubmit: handleSubmitRemovePlayer,
        loading: removePlayerRequestState.loading,
        error: removePlayerRequestState.error,
        // isCompleted: isEditClubRequestCompleted,
        // setIsCompleted: setIsEditClubRequestCompleted,
      }}
      makePlayerAdminRQ={{
        onSubmit: handleSubmitmakePlayerAdmin,
        loading: makePlayerAdminRequestState.loading,
        error: makePlayerAdminRequestState.error,
      }}
    />
  );
}
