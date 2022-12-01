import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { TeamHeading } from 'src/modules/matches/atoms/TeamHeading';
import { TeamsEnum } from 'src/modules/matches/enums';
import { formatScore } from 'src/utils/match';
import { formatDate, formatTime } from 'src/utils/date';

export const MatchDetailHeading = ({ match }) => {
  return (
    <Box bg={'brand.boxBackground'} py={6} px={14} borderRadius={'base'}>
      {match.id && (
        <Flex justify={'space-between'}>
          <Box fontWeight={'bold'}>{formatDate(match.date, 'dd/MM/yyyy')}</Box>
          <Flex gap={4}>
            Total time: <Text fontWeight={'bold'}>{formatTime(match.timer)}</Text>
          </Flex>
        </Flex>
      )}
      <SimpleGrid columns={3} spacing={10} align={'center'}>
        <TeamHeading team={match.teams.home} teamId={TeamsEnum.HOME} />
        <Flex direction={'column'} align={'center'}>
          <Text>Score</Text>
          <Text fontSize={'5xl'} fontWeight={'bold'} lineHeight={1}>
            {formatScore(match.score)}
          </Text>
        </Flex>
        <TeamHeading team={match.teams.guest} teamId={TeamsEnum.GUEST} />
      </SimpleGrid>
    </Box>
  );
};
