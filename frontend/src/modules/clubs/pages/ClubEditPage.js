import ClubEditTemplate from 'src/modules/clubs/templates/ClubEditTemplate';
import { CLUB_BY_ID_QUERY, FETCH_CLUBS } from 'src/modules/clubs/apollo/queries';
import { useQuery } from '@apollo/client';
import {
  INVITE_PLAYER_MUTATION,
  EDIT_CLUB_MUTATION,
  REMOVE_PLAYER_MUTATION,
  SET_CLUB_ADMIN_STATUS,
  DELETE_CLUB_MUTATION,
} from 'src/modules/clubs/apollo/mutations';
import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useAuthClient } from 'src/modules/auth/apollo/client';
import { route } from 'src/Routes';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { uploadLogo } from 'src/utils/match';
import { useClubStore } from 'src/modules/clubs/store/clubStore';

export default function ClubEditPage() {
  const toast = useToast();
  // const { data, loading, refetch } = useQuery(FETCH_CLUBS);
  const { selectClub } = useClubStore();

  const { id } = useParams();

  const { data, loading, refetch } = useQuery(CLUB_BY_ID_QUERY, { variables: { id: id } });

  const club = data?.clubByID;

  // const club = data?.clubs?.find((club) => {
  //   if (club.id === id && id) {
  //     return club;
  //   }
  //   return null;
  // });

  console.log('data: ' + JSON.stringify(data));
  const clubRQ = { club, loading };

  const { user } = useAuthClient();

  //** Request for inviting a player */
  const [isInvitePlayerCompleted, setIsInvitePlayerCompleted] = useState(false);
  const [emailFromInvitation, setEmailForInvitation] = useState('');

  const [invitePlayerRequest, invitePlayerRequestState] = useMutation(INVITE_PLAYER_MUTATION, {
    onCompleted: () => {
      setIsInvitePlayerCompleted(true);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleSubmitInvitePlayer = useCallback(
    (variables) => {
      const clubId = club?.id;
      variables = { ...variables, clubId };
      invitePlayerRequest({ variables });
      setEmailForInvitation(variables.email);
    },
    [invitePlayerRequest, club?.id],
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
    async (variables, id) => {
      id = club?.id;
      const playerId = club.contactPerson.id;

      variables = {
        ...variables,
        id,
        playerId,
      };

      if (variables.logo) {
        const logoResponse = await uploadLogo(variables.logo);
        variables.imageURL = logoResponse?.data?.serverFiles?.[0];
      }

      await editClubRequest({ variables });
      selectClub({
        ...club,
        ...variables,
      });
    },
    [editClubRequest, club?.id],
  );

  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [deleteClubRequest, deleteClubRequestState] = useMutation(DELETE_CLUB_MUTATION, {
    onCompleted: () => {
      console.log('Jsem tu');
      navigate(route.dashboard());
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleDeleteClub = (confirmDelete) => {
    if (confirmDelete) {
      console.log('confirmDelete: ' + confirmDelete);
      deleteClubRequest({ variables: { clubId: club?.id } });
    }
    onClose();
  };

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

  //** Request for making a player a admin */
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
    async (variables) => {
      await makePlayerAdminRequest({ variables });
    },
    [makePlayerAdminRequest],
  );

  const isCurrUserAdmin = club?.players?.find((player) => {
    if (player?.email === user.email) {
      return player.isAdmin;
    }
    return null;
  });

  if (!isCurrUserAdmin && club) {
    toast({
      title: 'You naughty naughty :)',
      status: 'error',
      position: 'top-right',
      duration: 4000,
      isClosable: true,
    });
    return <Navigate to={route.clubDetail(clubRQ?.club?.id)} replace />;
  }

  return (
    <ClubEditTemplate
      clubRQ={clubRQ}
      clubDeleteRQ={{
        isOpen,
        onOpen,
        onClose,
        handleDeleteClub,
      }}
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
      }}
      makePlayerAdminRQ={{
        onSubmit: handleSubmitmakePlayerAdmin,
        loading: makePlayerAdminRequestState.loading,
        error: makePlayerAdminRequestState.error,
        refetch: refetch,
      }}
    />
  );
}
