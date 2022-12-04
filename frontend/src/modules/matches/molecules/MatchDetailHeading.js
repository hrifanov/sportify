import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { TeamHeading } from 'src/modules/matches/atoms/TeamHeading';
import { TeamsEnum } from 'src/modules/matches/enums';
import { formatScore } from 'src/utils/match';
import { formatDate, formatTime } from 'src/utils/date';
import { MatchTimer } from 'src/modules/matches/atoms/MatchTimer';

export const MatchDetailHeading = ({ match }) => {
  return (
    <Box
      bg={'brand.boxBackground'}
      py={{ base: 3, md: 6 }}
      px={{ base: 4, md: 14 }}
      borderRadius={'base'}
    >
      {match.id && (
        <Flex justify={'space-between'}>
          <Box fontWeight={'bold'}>{formatDate(match.date, 'dd/MM/yyyy')}</Box>
          <Flex gap={4}>
            Total time: <Text fontWeight={'bold'}>{formatTime(match.timer)}</Text>
          </Flex>
        </Flex>
      )}
      <Flex justify={{ base: 'space-evenly', md: 'space-between' }} align={'center'}>
        <Box display={{ base: 'none', md: 'block' }}>
          <TeamHeading team={match.teams.home} teamId={TeamsEnum.HOME} />
        </Box>
        <Flex direction={'column'} align={'center'}>
          <Text>Score</Text>
          <Text fontSize={{ base: '3xl', md: '5xl' }} fontWeight={'bold'} lineHeight={1}>
            {formatScore(match.score)}
          </Text>
        </Flex>
        <Box display={{ base: 'none', md: 'block' }}>
          <TeamHeading team={match.teams.guest} teamId={TeamsEnum.GUEST} />
        </Box>

        <Box display={{ base: 'block', md: 'none' }} flexShrink={0}>
          <MatchTimer />
        </Box>
      </Flex>
    </Box>
  );
};
