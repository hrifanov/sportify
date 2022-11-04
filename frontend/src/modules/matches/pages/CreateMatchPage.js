import CreateMatchTemplate from 'src/modules/matches/templates/CreateMatchTemplate';
import { FETCH_CLUBS } from 'src/modules/clubs/apollo/queries';
import { useQuery } from '@apollo/client';

export default function CreateMatchPage() {
  const { data, loading } = useQuery(FETCH_CLUBS);
  const club = data?.clubs?.[0];

  return <CreateMatchTemplate club={club} loading={loading} />;
}
