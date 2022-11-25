import DashboardTemplate from 'src/modules/clubs/templates/DashboardTemplate';
import { FETCH_CLUBS } from 'src/modules/clubs/apollo/queries';
import { useQuery } from '@apollo/client';

export default function ClubDetailPage() {
  const { data, loading } = useQuery(FETCH_CLUBS);
  const clubs = data?.clubs;

  return <DashboardTemplate clubs={clubs} loading={loading} />;
}
