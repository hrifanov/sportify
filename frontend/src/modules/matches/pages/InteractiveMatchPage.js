import { MainSection } from 'src/shared/core/atoms/MainSection.js';
import { Box, Button, Flex, Icon, IconButton, Spacer, Text, useToast } from '@chakra-ui/react';
import { MdPause, MdPlayArrow } from 'react-icons/md';
import { ModalGoal } from 'src/modules/matches/molecules/ModalGoal';
import { TeamActions } from 'src/modules/matches/molecules/TeamActions';
import { TeamsEnum } from 'src/modules/matches/enums';
import { formatTimer } from 'src/utils/date';
import { ModalPenalty } from '../molecules/ModalPenalty.js';
import {
  INTERACTIVE_MATCH_ACTIONS,
  useInteractiveMatchStore,
} from 'src/modules/matches/store/interactiveMatchStore';
import { AlertDeleteEvent } from 'src/modules/matches/molecules/AlertDeleteEvent';
import { AlertCancelMatch } from 'src/modules/matches/molecules/AlertCancelMatch';
import { AlertFinishMatch } from 'src/modules/matches/molecules/AlertFinishMatch';
import { Navigate } from 'react-router-dom';
import { MatchDetailHeading } from 'src/modules/matches/molecules/MatchDetailHeading';
import { MatchDetailEvents } from 'src/modules/matches/molecules/MatchDetailEvents';
import { route } from 'src/Routes';
import { MatchTimer } from 'src/modules/matches/atoms/MatchTimer';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { FETCH_ENUMS } from 'src/modules/matches/apollo/queries';

export const InteractiveMatchPage = () => {
  window.store = useInteractiveMatchStore();
  const toast = useToast();
  const { data: enumsData } = useQuery(FETCH_ENUMS);

  const {
    isPast,
    match,
    isPaused,
    timer,
    computed,
    toggleTimer,
    uiAction,
    lastFinishedMatchId,
    setEnums,
  } = useInteractiveMatchStore();

  useEffect(() => {
    if (!enumsData?.enums) return;
    setEnums(enumsData.enums);
  }, [enumsData, setEnums]);

  if (!match) {
    if (lastFinishedMatchId) {
      return <Navigate to={route.matchDetail(lastFinishedMatchId)} />;
    }

    toast({ title: 'There is no active match.', status: 'error', position: 'top-right' });
    return <Navigate to={'/'} />;
  }

  return (
    <MainSection containerProps={{ maxW: 'container.lg', minW: '330px' }}>
      <Flex direction={'column'} minHeight={'100%'} height={{ md: '100%' }}>
        <MatchDetailHeading match={computed.rawMatch} />
        <Box
          bg={'brand.boxBackground'}
          mt={1}
          py={3}
          px={{ base: 4, md: 10 }}
          borderRadius={'base'}
        >
          <Flex
            gap={{ base: 2, md: 5 }}
            alignItems={{ md: 'center' }}
            direction={{ base: 'column', md: 'row' }}
          >
            <TeamActions teamId={TeamsEnum.HOME} isPast={isPast} />
            <Box mx={'auto'}>
              <MatchTimer display={{ base: 'none', md: 'flex' }} />
            </Box>
            <TeamActions teamId={TeamsEnum.GUEST} isPast={isPast} />
          </Flex>
        </Box>
        <MatchDetailEvents events={computed.events} />
        <Box bg={'brand.boxBackground'} py={3} px={[6, 14]} mt={1} borderRadius={'base'}>
          <Flex>
            <Button
              size={'sm'}
              w={['48%', 'initial']}
              variant={'outline'}
              onClick={() => uiAction(INTERACTIVE_MATCH_ACTIONS.CANCEL_MATCH)}
            >
              Cancel match
            </Button>
            <Spacer />
            <Button
              size={'sm'}
              w={['48%', 'initial']}
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
