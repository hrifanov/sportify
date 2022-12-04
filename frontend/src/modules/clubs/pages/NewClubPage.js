import NewClubTemplate from 'src/modules/clubs/templates/NewClubTemplate';
import { CREATE_CLUB_MUTATION } from 'src/modules/clubs/apollo/mutations';
import { useMutation } from '@apollo/client';
// import { Navigate } from 'react-router-dom';
import { route } from 'src/Routes';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FETCH_CLUBS } from 'src/modules/clubs/apollo/queries';
import { useQuery } from '@apollo/client';
import { config } from 'src/config';

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

  // console.log('be url: ' + config.BE_ROOT);

  const uploadLogo = async (file) => {
    console.log(file);

    const formData = new FormData();
    formData.append(file.name, file);

    const response = await fetch('http://localhost:4000/upload', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: formData, // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  };

  // console.log('User: ' + user.id);
  const handleCreateClub = useCallback(
    async (variables) => {
      // console.log('variables: ' + JSON.stringify(variables));

      const data = await uploadLogo(variables.logo);
      // console.log(data.data.serverFiles[0]);
      variables = { ...variables, playerId: user?.id, imageURL: data?.data?.serverFiles?.[0] };
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
