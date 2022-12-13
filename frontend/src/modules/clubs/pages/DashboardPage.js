import DashboardTemplate from 'src/modules/clubs/templates/DashboardTemplate';
import { USER_QUERY } from 'src/modules/clubs/apollo/queries';
import { useQuery } from '@apollo/client';

export default function ClubDetailPage({ user }) {
  // const { data, loading } = useQuery(FETCH_CLUBS);
  const { data, loading } = useQuery(USER_QUERY, { variables: { userName: user.userName } });
  const clubs = data?.user?.clubs;

  return <DashboardTemplate clubs={clubs} loading={loading} />;
}
