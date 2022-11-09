import ClubEditTemplate from 'src/modules/clubs/templates/ClubEditTemplate';
import { FETCH_CLUBS } from 'src/modules/clubs/apollo/queries';
import { useQuery } from '@apollo/client';

export default function ClubEditPage() {
  const { data, loading } = useQuery(FETCH_CLUBS);
  const club = data?.clubs?.[0];
  return <ClubEditTemplate club={club} loading={loading} />;
}
