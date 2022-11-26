import NewClubTemplate from 'src/modules/clubs/templates/NewClubTemplate';
import { CREATE_CLUB_MUTATION } from 'src/modules/clubs/apollo/mutations';
import { useMutation } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import { route } from 'src/Routes';
import { useCallback } from 'react';

export default function NewClubPage(user) {
  user = user?.user;
  const [createClubRequest, createClubRequestState] = useMutation(CREATE_CLUB_MUTATION, {
    onCompleted: (data) => {
      console.log(data);
      Navigate(route.clubEdit(data.createClub));
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleCreateClub = useCallback(
    (variables) => {
      variables = { ...variables, playerId: user?.id };
      createClubRequest({ variables });
    },
    [createClubRequest, user?.id],
    () => {},
  );

  return (
    <NewClubTemplate
      createClubRQ={{
        error: createClubRequestState.error,
        loading: createClubRequestState.loading,
        onSubmit: handleCreateClub,
      }}
    />
  );
}
