import { ClubListItem } from '../molecules/ClubListItem';

export default function AllClubs({ clubs, user }) {
  const userId = user.id;
  const ClubsList = () =>
    clubs.map((club) => {
      return <ClubListItem key={club.id} club={club} joinable={true} userId={userId} />;
    });

  return <ClubsList />;
}
