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
import { useAuthClient } from 'src/modules/auth/apollo/client';
import { route } from 'src/Routes';
import { Navigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

export default function ClubEditPage() {
  const toast = useToast();
  const { data, loading } = useQuery(FETCH_CLUBS);
  const club = data?.clubs?.[0];
  const clubRQ = { club, loading };

  const { user } = useAuthClient();
  // console.log('user: ' + user.email);

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

  console.log('club.id: ' + club.id);

  const handleSubmitEditClub = useCallback(
    (variables, clubId) => {
      clubId = club.id;
      variables = { ...variables, clubId };
      editClubRequest({ variables });
    },
    [editClubRequest, club.id],
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

  const isCurrUserAdmin = club?.players?.find((player) => {
    if (player?.email === user.email) {
      // console.log(player.email);
      // console.log(player.isAdmin);
      return player.isAdmin;
    }
  });

  if (!isCurrUserAdmin) {
    toast({
      title: `What a naughty boy :)
       Next time, ask your admin to give you a permission to do that, please.
        `,
      status: 'error',
      position: 'top-right',
      duration: 4000,
      isClosable: true,
    });
    return <Navigate to={route.clubDetail()} replace />;
  }

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