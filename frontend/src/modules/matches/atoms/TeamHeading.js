import { Flex, Text } from '@chakra-ui/react';
import { TeamAvatar } from 'src/modules/matches/atoms/TeamAvatar';
import { TeamsEnum } from 'src/modules/matches/enums';

export const TeamHeading = ({ team, teamId }) => {
  return (
    <Flex align={'center'} gap={5} direction={teamId === TeamsEnum.HOME ? 'row' : 'row-reverse'}>
      <Text fontSize={'2xl'}>{team.name}</Text>
      <TeamAvatar team={team} />
    </Flex>
  );
};
