import ClubDetailTemplate from 'src/modules/clubs/templates/ClubDetailTemplate';
import { FETCH_CLUBS } from 'src/modules/clubs/apollo/queries';
import { useQuery } from '@apollo/client';
import { useAuthClient } from 'src/modules/auth/apollo/client';

export default function ClubDetailPage() {
  const { data, loading } = useQuery(FETCH_CLUBS);
  const club = data?.clubs?.[0];

  const { user } = useAuthClient();
  // console.log('user: ' + user.email);

  const isCurrUserAdmin = club.players.find((player) => {
    if (player.email === user.email) {
      // console.log(player.email);
      // console.log(player.isAdmin);
      return player.isAdmin;
    }
  });
  return <ClubDetailTemplate club={club} loading={loading} isCurrUserAdmin={isCurrUserAdmin} />;
}
