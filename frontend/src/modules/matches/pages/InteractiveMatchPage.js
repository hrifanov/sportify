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
  useToast,
} from '@chakra-ui/react';
import { MdPause, MdPlayArrow } from 'react-icons/md';
import { ModalGoal } from 'src/modules/matches/molecules/ModalGoal';
import { MatchEvent } from 'src/modules/matches/atoms/MatchEvent';
import { TeamActions } from 'src/modules/matches/molecules/TeamActions';
import { TeamsEnum } from 'src/modules/matches/enums';
import { TeamHeading } from 'src/modules/matches/atoms/TeamHeading';
import { formatTimer } from 'src/utils/date';
import { formatScore } from 'src/utils/match';
import { ModalPenalty } from '../molecules/ModalPenalty.js';
import {
  INTERACTIVE_MATCH_ACTIONS,
  useInteractiveMatchStore,
} from 'src/modules/matches/store/interactiveMatchStore';
import { AlertDeleteEvent } from 'src/modules/matches/molecules/AlertDeleteEvent';
import { AlertCancelMatch } from 'src/modules/matches/molecules/AlertCancelMatch';
import { AlertFinishMatch } from 'src/modules/matches/molecules/AlertFinishMatch';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const InteractiveMatchPage = () => {
  window.store = useInteractiveMatchStore();
  const toast = useToast();

  const { match, isPaused, timer, computed, toggleTimer, uiAction } = useInteractiveMatchStore();

  if (!match) {
    toast({ title: 'There is no active match.', status: 'error', position: 'top-right' });
    return <Navigate to={'/'} />;
  }

  return (
    <MainSection containerProps={{ maxW: 'container.lg' }}>
      <Flex direction={'column'} height={'100%'} pb={10}>
        <Box bg={'brand.boxBackground'} py={6} px={14} borderRadius={'base'}>
          <SimpleGrid columns={3} spacing={10} align={'center'}>
            <TeamHeading team={match.teams.home} teamId={TeamsEnum.HOME} />
            <Flex direction={'column'} align={'center'}>
              <Text>Score</Text>
              <Text fontSize={'5xl'} fontWeight={'bold'} lineHeight={1}>
                {formatScore(computed.score)}
              </Text>
            </Flex>
            <TeamHeading team={match.teams.guest} teamId={TeamsEnum.GUEST} />
          </SimpleGrid>
        </Box>
        <Box bg={'brand.boxBackground'} mt={1} py={3} px={10} borderRadius={'base'}>
          <Grid templateColumns={'2fr 1fr 2fr'} gap={5} alignItems={'center'}>
            <TeamActions teamId={TeamsEnum.HOME} />
            <GridItem as={Flex} direction={'column'} mx={'auto'}>
              <Flex align={'center'} justify={'center'} gap={2} mb={1}>
                <IconButton
                  aria-label={'Timer'}
                  icon={<Icon as={isPaused ? MdPlayArrow : MdPause} boxSize={10} />}
                  mt={1}
                  variant={'ghost'}
                  onClick={toggleTimer}
                />
                <Text fontSize={'2xl'} lineHeight={1}>
                  {formatTimer(timer)}
                </Text>
              </Flex>
            </GridItem>
            <TeamActions teamId={TeamsEnum.GUEST} />
          </Grid>
        </Box>
        <Box
          bg={'brand.boxBackground'}
          py={6}
          px={14}
          mt={1}
          borderRadius={'base'}
          flexGrow={1}
          minHeight={0}
        >
          <Flex direction={'column'} overflowY={'scroll'} height={'100%'}>
            {!!computed.events.length ? (
              <>
                {computed.events.map((event) => (
                  <MatchEvent key={event.id} event={event} />
                ))}
                <Box borderBottom={'1px solid #9FB2D1'} />
              </>
            ) : (
              <Text textColor={'brand.secondary'} fontSize={'xl'} m={'auto'}>
                Add some events
              </Text>
            )}
          </Flex>
        </Box>
        <Box bg={'brand.boxBackground'} py={3} px={14} mt={1} borderRadius={'base'}>
          <Flex>
            <Button
              size={'sm'}
              variant={'outline'}
              onClick={() => uiAction(INTERACTIVE_MATCH_ACTIONS.CANCEL_MATCH)}
            >
              Cancel match
            </Button>
            <Spacer />
            <Button
              size={'sm'}
              variant={'primary'}
              onClick={() => uiAction(INTERACTIVE_MATCH_ACTIONS.FINISH_MATCH)}
            >
              Finish match
            </Button>
          </Flex>
        </Box>
      </Flex>

      <ModalGoal />
      <ModalPenalty />
      <AlertDeleteEvent />
      <AlertCancelMatch />
      <AlertFinishMatch />
    </MainSection>
  );
};
