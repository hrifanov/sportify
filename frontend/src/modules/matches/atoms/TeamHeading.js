import { Flex, Text } from '@chakra-ui/react';
import { TeamAvatar } from 'src/modules/matches/atoms/TeamAvatar';
import { TeamsEnum } from 'src/modules/matches/enums';

export const TeamHeading = ({ team, teamId }) => {
  return (
    <Flex
      align={'center'}
      gap={{ base: 2, md: 5 }}
      direction={teamId === TeamsEnum.HOME ? 'row' : 'row-reverse'}
    >
      <Text display={{ base: 'none', md: 'block' }} fontSize={{ base: 'sm', md: '2xl' }}>
        {team.name}
      </Text>
      <TeamAvatar team={team} size={{ base: 'sm', md: 'lg' }} />
    </Flex>
  );
};
