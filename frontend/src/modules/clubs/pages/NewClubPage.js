import NewClubTemplate from 'src/modules/clubs/templates/NewClubTemplate';
import { CREATE_CLUB_MUTATION } from 'src/modules/clubs/apollo/mutations';
import { useMutation } from '@apollo/client';
import { route } from 'src/Routes';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DISTRICTS_QUERY } from 'src/modules/clubs/apollo/queries';
import { useQuery } from '@apollo/client';
import { uploadLogo } from 'src/utils/match';

export default function NewClubPage(user) {
  const districtsQueryResponse = useQuery(DISTRICTS_QUERY);
  const districts = districtsQueryResponse?.data?.enums?.districts;

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
    async (variables) => {
      const key = districts.find((district) => district.value === variables.locality).key;
      console.log('key: ' + JSON.stringify(key));

      variables = { ...variables, playerId: user?.id, locality: key };

      if (variables.logo) {
        const data = await uploadLogo(variables.logo);
        variables.imageURL = data?.data?.serverFiles?.[0];
      }
      createClubRequest({ variables });
    },
    [createClubRequest, user?.id, districts],
    () => {},
  );

  return (
    <NewClubTemplate
      createClubRQ={{
        error: createClubRequestState.error,
        loading: createClubRequestState.loading,
        onSubmit: handleCreateClub,
        districts: districts,
      }}
    />
  );
}
