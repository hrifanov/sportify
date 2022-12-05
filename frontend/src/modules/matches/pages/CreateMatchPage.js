import CreateMatchTemplate from 'src/modules/matches/templates/CreateMatchTemplate';
import { CLUB_BY_ID_QUERY } from 'src/modules/clubs/apollo/queries';
import { useQuery } from '@apollo/client';
import { useClubStore } from 'src/modules/clubs/store/clubStore';

export default function CreateMatchPage() {
  const { activeClub } = useClubStore();
  const { data, loading } = useQuery(CLUB_BY_ID_QUERY, {
    variables: { id: activeClub.id },
  });

  return <CreateMatchTemplate club={data?.clubByID} loading={loading} />;
}
