import { Avatar } from '@chakra-ui/react';

export const TeamAvatar = ({ team, size = 'lg' }) => {
  return <Avatar name={team.name} size={size} bg={'#46526d'} />;
};
