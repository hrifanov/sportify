import { ClubListItem } from '../molecules/ClubListItem';

export default function AllClubs(clubs) {
  clubs = clubs.clubs;

  const ClubsList = () =>
    clubs.map((club) => {
      return <ClubListItem key={club.id} club={club} joinable={true} />;
    });

  return <ClubsList />;
}
