import CreateMatchTemplate from 'src/modules/matches/templates/CreateMatchTemplate';
import { FETCH_CLUBS } from 'src/modules/matches/apollo/queries';
import { useQuery } from '@apollo/client';

export default function CreateMatchPage() {
  const { data, loading } = useQuery(FETCH_CLUBS);

  return <CreateMatchTemplate club={data?.clubs?.[0]} loading={loading} />;
}
