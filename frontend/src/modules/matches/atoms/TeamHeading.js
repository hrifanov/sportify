import { Flex, Text } from '@chakra-ui/react';
import { TeamAvatar } from 'src/modules/matches/atoms/TeamAvatar';

export const TeamHeading = ({ team }) => {
  return (
    <Flex align={'center'} gap={5}>
      <Text fontSize={'4xl'}>{team.name}</Text>
      <TeamAvatar team={team} />
    </Flex>
  );
};
