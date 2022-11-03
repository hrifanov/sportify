import ClubDetailTemplate from 'src/modules/clubs/templates/ClubDetailTemplate';
import { FETCH_CLUBS } from 'src/modules/clubs/apollo/queries';
import { useQuery } from '@apollo/client';

export default function ClubDetailPage() {
  const { data, loading } = useQuery(FETCH_CLUBS);
  const club = data?.clubs?.[0];

  return <ClubDetailTemplate club={club} loading={loading} />;
}
