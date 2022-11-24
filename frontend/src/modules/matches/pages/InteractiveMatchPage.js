import { MainSection } from 'src/shared/core/atoms/MainSection.js';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  SimpleGrid,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { MdEdit, MdPause, MdPlayArrow, MdPlusOne } from 'react-icons/md';
import { GiHockey, GiCrosshair, GiWhistle } from 'react-icons/gi';
import { ModalGoal } from 'src/modules/matches/molecules/ModalGoal';
import {
  getScore,
  useInteractiveMatchClient,
} from 'src/modules/matches/apollo/interactiveMatchClient';
import { MatchEvent } from 'src/modules/matches/atoms/MatchEvent';
import { TeamActions } from 'src/modules/matches/molecules/TeamActions';
import { TeamsEnum } from 'src/modules/matches/enums';
import { TeamAvatar } from 'src/modules/matches/atoms/TeamAvatar';
import { TeamHeading } from 'src/modules/matches/atoms/TeamHeading';
import { formatTimer } from '../../../utils/date.js';
import { formatScore } from '../../../utils/match.js';
import { ModalPenalty } from '../molecules/ModalPenalty.js';

export const InteractiveMatchPage = () => {
  const interactiveMatchClient = useInteractiveMatchClient();
  const matchState = interactiveMatchClient.state;

  return (
    <MainSection containerProps={{ maxW: 'container.lg' }}>
      <Box bg={'brand.boxBackground'} py={6} px={14} borderRadius={'base'}>
        <SimpleGrid columns={3} spacing={10} align={'center'}>
          <TeamHeading team={matchState.teams.home} />
          <Flex direction={'column'} align={'center'}>
            <Text>Score</Text>
            <Text fontSize={'5xl'} fontWeight={'bold'} lineHeight={1}>
              {formatScore(interactiveMatchClient.getScore())}
            </Text>
          </Flex>
          <TeamHeading team={matchState.teams.guest} />
        </SimpleGrid>
      </Box>
      <Box bg={'brand.boxBackground'} mt={1} py={3} px={10} borderRadius={'base'}>
        <Grid templateColumns={'2fr 1fr 2fr'} gap={5} alignItems={'center'}>
          <TeamActions teamId={TeamsEnum.HOME} />
          <GridItem as={Flex} direction={'column'} mx={'auto'}>
            <Flex align={'center'} justify={'center'} gap={2} mb={1}>
              <IconButton
                aria-label={'Timer'}
                icon={<Icon as={matchState.isPaused ? MdPlayArrow : MdPause} boxSize={10} />}
                mt={1}
                variant={'ghost'}
              />
              <Text fontSize={'2xl'} lineHeight={1}>
                {formatTimer(matchState.timer)}
              </Text>
            </Flex>
          </GridItem>
          <TeamActions teamId={TeamsEnum.GUEST} />
        </Grid>
      </Box>
      <Box bg={'brand.boxBackground'} py={6} px={14} mt={1} borderRadius={'base'}>
        <Flex direction={'column-reverse'}>
          {matchState.events.map((event) => (
            <MatchEvent key={event.id} event={event} />
          ))}
          <Box borderBottom={'1px solid #9FB2D1'} />
        </Flex>
      </Box>
      <Box bg={'brand.boxBackground'} py={3} px={14} mt={1} borderRadius={'base'}>
        <Flex>
          <Button size={'sm'} variant={'outline'}>
            Cancel match
          </Button>
          <Spacer />
          <Button size={'sm'} variant={'primary'}>
            Finish and Save
          </Button>
        </Flex>
      </Box>

      <ModalGoal />
      <ModalPenalty />
    </MainSection>
  );
};
