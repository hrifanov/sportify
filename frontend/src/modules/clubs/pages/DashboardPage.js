import DashboardTemplate from 'src/modules/clubs/templates/DashboardTemplate';
import { USER_QUERY } from 'src/modules/clubs/apollo/queries';
import { useQuery } from '@apollo/client';

export default function DashboardPage({ user }) {
  const { data, loading } = useQuery(USER_QUERY, { variables: { userName: user.userName } });
  const clubs = data?.user?.clubs;
  const errors = useQuery(FETCH_CLUBS, {
    variables: { param: 'locality', value: 'test', exact: false },
  });
  const allClubs = errors?.data?.clubs;
  console.log(errors);

  return <DashboardTemplate clubs={clubs} allClubs={allClubs} loading={loading} user={user} />;
}
