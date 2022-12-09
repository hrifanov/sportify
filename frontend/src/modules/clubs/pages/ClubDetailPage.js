import ClubDetailTemplate from 'src/modules/clubs/templates/ClubDetailTemplate';
import { CLUB_APPLICATIONS_QUERY, CLUB_BY_ID_QUERY } from 'src/modules/clubs/apollo/queries';
import { useQuery, useMutation } from '@apollo/client';
import { useAuthClient } from 'src/modules/auth/apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { route } from 'src/Routes';
import { useToast } from '@chakra-ui/react';
import { FullPageSpinner } from 'src/shared/design-system/atoms/FullPageSpinner';
import { EDIT_APLICATION_MUTATION } from '../apollo/mutations';
import { useCallback } from 'react';

export default function ClubDetailPage() {
  const toast = useToast();
  const { id } = useParams();
  const { data, loading } = useQuery(CLUB_BY_ID_QUERY, {
    variables: { id },
  });

  const clubApplicationsQuery = useQuery(CLUB_APPLICATIONS_QUERY, {
    variables: { clubId: id },
  });

  const [editApplicationRequest, editApplicationRequestState] = useMutation(
    EDIT_APLICATION_MUTATION,
    {
      onCompleted: () => {},
      onError: (e) => {
        console.log(e);
      },
    },
  );

  const handleApplication = useCallback(
    (applicationId, newState) => {
      const variables = { applicationId, newState: newState };
      editApplicationRequest({ variables });
      toast({
        title: `Application has been ${newState === 'accepted' ? 'accepted. ' : 'declined.'}`,
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    },
    [editApplicationRequest, toast],
  );

  const club = data?.clubByID;
  const players = club?.players;
  const matches = club?.matches;
  const applications = clubApplicationsQuery?.data?.applications;
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
      applications={applications}
      handleApplication={handleApplication}
      loading={loading}
      players={players}
      isCurrUserAdmin={isCurrUserAdmin}
    />
  );
}
