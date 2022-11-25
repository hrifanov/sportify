import NewClubTemplate from 'src/modules/clubs/templates/NewClubTemplate';
import { CREATE_CLUB_MUTATION } from 'src/modules/clubs/apollo/mutations';
import { useMutation } from '@apollo/client';
// import { Navigate } from 'react-router-dom';
import { route } from 'src/Routes';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FETCH_CLUBS } from 'src/modules/clubs/apollo/queries';
import { useQuery } from '@apollo/client';

export default function NewClubPage(user) {
  const navigate = useNavigate();
  user = user?.user;
  const [createClubRequest, createClubRequestState] = useMutation(CREATE_CLUB_MUTATION, {
    onCompleted: (data) => {
      navigate(route.clubEdit(data.createClub));
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
