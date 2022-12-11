import { useMutation, useQuery } from '@apollo/client';
import { useDisclosure } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { CREATE_SEASON_MUTATION, DELETE_SEASON_MUTATION } from '../apollo/mutations';
import { CLUB_BY_ID_QUERY } from '../apollo/queries';
import ManageSeasonsTemplate from '../templates/ManageSeasonsTemplate';

export const ManageSeasonsPage = ({ user }) => {
  const { id } = useParams();
  const [createSeasonRequest, createSeasonRequestState] = useMutation(CREATE_SEASON_MUTATION, {
    onCompleted: (data) => {},
    onError: (e) => {
      console.log(e);
    },
  });

  const { data, refetch } = useQuery(CLUB_BY_ID_QUERY, { variables: { id: id } });

  const club = data?.clubByID;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalNewSeason = { isOpen, onOpen, onClose };

  const handleCreateSeason = useCallback(
    (variables) => {
      variables = { ...variables, club: id };
      createSeasonRequest({ variables });
      onClose();
      refetch();
    },
    [createSeasonRequest, id, onClose, refetch],
    () => {},
  );

  const [deleteSeasonRequest] = useMutation(DELETE_SEASON_MUTATION, {
    onCompleted: () => {
      refetch();
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleDeleteSeason = (seasonId) => {
    deleteSeasonRequest({ variables: { seasonId } });
  };

  // console.log(handleCreateSeason);

  return (
    <ManageSeasonsTemplate
      onSubmit={handleCreateSeason}
      loading={createSeasonRequestState.loading}
      error={createSeasonRequestState.error}
      club={club}
      modalNewSeason={modalNewSeason}
      // isOpen={isOpen}
      // onOpen={onOpen}
      // onClose={onClose}
      handleDeleteSeason={handleDeleteSeason}
      createSeasonRQ={{
        onSubmit: handleCreateSeason,
        loading: createSeasonRequestState.loading,
        error: createSeasonRequestState.error,
      }}
    />
  );
};
