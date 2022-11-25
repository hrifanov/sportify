import NewClubTemplate from 'src/modules/clubs/templates/NewClubTemplate';
import { FETCH_CLUBS } from 'src/modules/clubs/apollo/queries';
import { useQuery } from '@apollo/client';

export default function NewClubPage() {
  return <NewClubTemplate />;
}
