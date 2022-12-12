import { ClubListItem } from '../molecules/ClubListItem';

export default function AllClubs({ allClubs, itemsPerPage, user }) {
  const userId = user.id;
  const ClubsList = () =>
    allClubs.map((club) => {
      return <ClubListItem key={club.id} club={club} joinable={true} userId={userId} />;
    });

  return <ClubsList />;
}
