import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { CREATE_SEASON_MUTATION } from '../apollo/mutations';
import ManageSeasonsTemplate from '../templates/ManageSeasonsTemplate';

export const ManageSeasonsPage = () => {
  const [createSeasonRequest, createSeasonRequestState] = useMutation(CREATE_SEASON_MUTATION, {
    onCompleted: (data) => {},
    onError: (e) => {
      console.log(e);
    },
  });

  const handleCreateSeason = useCallback(
    (variables) => {
      variables = { ...variables };
      createSeasonRequest({ variables });
    },
    [createSeasonRequest],
    () => {},
  );

  return (
    <ManageSeasonsTemplate
      createClubRQ={{
        error: createSeasonRequestState.error,
        loading: createSeasonRequestState.loading,
        onSubmit: handleCreateSeason,
      }}
    />
  );
};
