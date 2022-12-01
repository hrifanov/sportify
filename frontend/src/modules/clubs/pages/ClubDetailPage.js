import ClubDetailTemplate from 'src/modules/clubs/templates/ClubDetailTemplate';
import { FETCH_CLUBS } from 'src/modules/clubs/apollo/queries';
import { useQuery } from '@apollo/client';
import { useAuthClient } from 'src/modules/auth/apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { route } from 'src/Routes';
import { useToast } from '@chakra-ui/react';

export default function ClubDetailPage() {
  const { data, loading } = useQuery(FETCH_CLUBS);
  const { id } = useParams();
  const toast = useToast();
  const club = data?.clubs?.find((club) => {
    if (club.id === id && id) {
      return club;
    }
    return null;
  });

  const { user } = useAuthClient();

  const isCurrUserAdmin = club?.players?.find((player) => {
    if (player.email === user.email) {
      return player.isAdmin;
    }
    return null;
  });
  if (!club) {
    toast({
      title: 'Club was not found',
      status: 'error',
      position: 'top-right',
      duration: 3000,
      isClosable: true,
    });
    return <Navigate to={route.dashboard()} replace />;
  }
  return (
    <ClubDetailTemplate
      club={club}
      matches={matches}
      loading={loading}
      players={players}
      isCurrUserAdmin={isCurrUserAdmin}
    />
  );


  
}
