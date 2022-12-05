import ClubDetailTemplate from 'src/modules/clubs/templates/ClubDetailTemplate';
import { CLUB_BY_ID_QUERY } from 'src/modules/clubs/apollo/queries';
import { useQuery } from '@apollo/client';
import { useAuthClient } from 'src/modules/auth/apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { route } from 'src/Routes';
import { useToast } from '@chakra-ui/react';
import { FullPageSpinner } from 'src/shared/design-system/atoms/FullPageSpinner';

export default function ClubDetailPage() {
  const toast = useToast();
  const { id } = useParams();
  const { data, loading } = useQuery(CLUB_BY_ID_QUERY, {
    variables: { id },
  });

  const club = data?.clubByID;
  const players = club?.players;
  const matches = club?.matches;

  const { user } = useAuthClient();

  const isCurrUserAdmin = club?.players?.find((player) => {
    if (player.email === user.email) {
      return player.isAdmin;
    }
    return null;
  });

  if (loading) {
    return <FullPageSpinner />;
  }

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
