import DashboardTemplate from 'src/modules/clubs/templates/DashboardTemplate';
import { FETCH_CLUBS, USER_QUERY } from 'src/modules/clubs/apollo/queries';
import { useQuery } from '@apollo/client';

export default function DashboardPage({ user }) {
  const { data, loading } = useQuery(USER_QUERY, { variables: { userName: user.userName } });
  const clubs = data?.user?.clubs;
  const allClubsQuery = useQuery(FETCH_CLUBS, {
    variables: { param: 'players', value: '639706c7e147c96a882b1377', exact: false },
  });
  const allClubs = allClubsQuery?.data?.clubs;

  return <DashboardTemplate clubs={clubs} allClubs={allClubs} loading={loading} user={user} />;
}
