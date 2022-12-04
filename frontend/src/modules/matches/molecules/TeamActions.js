import { Box, Button, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { GiCrosshair, GiHockey, GiWhistle } from 'react-icons/gi';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { TeamsEnum } from 'src/modules/matches/enums';
import {
  INTERACTIVE_MATCH_ACTIONS,
  useInteractiveMatchStore,
} from 'src/modules/matches/store/interactiveMatchStore';
import { Input } from 'src/shared/design-system/atoms';
import { TeamHeading } from 'src/modules/matches/atoms/TeamHeading';

export const TeamActions = ({ teamId, isPast }) => {
  const { addShot, uiAction, shots, setShots, match } = useInteractiveMatchStore();

  return (
    <Flex align={'center'} gap={2} direction={{ md: teamId === TeamsEnum.GUEST && 'row-reverse' }}>
      <Box display={{ base: 'block', md: 'none' }} mr={'auto'}>
        <TeamHeading team={match.teams[teamId]} teamId={teamId} />
      </Box>
      <Flex
        as={Button}
        size={{ base: 'sm', md: 'md' }}
        variant={'ghost'}
        direction={'column'}
        gap={1}
        h={{ base: 'auto', md: 'auto' }}
        onClick={() => uiAction(INTERACTIVE_MATCH_ACTIONS.GOAL, { teamId })}
        fontSize={{ base: 'sm', md: 'md' }}
      >
        <Icon as={GiCrosshair} boxSize={{ base: 6, md: 8 }} />
        Goal
      </Flex>
      <Flex
        as={Button}
        size={{ base: 'sm', md: 'md' }}
        variant={'ghost'}
        direction={'column'}
        gap={1}
        h={{ base: 'auto', md: 'auto' }}
        onClick={() => uiAction(INTERACTIVE_MATCH_ACTIONS.PENALTY, { teamId })}
        fontSize={{ base: 'sm', md: 'md' }}
      >
        <Icon as={GiWhistle} boxSize={{ base: 6, md: 8 }} />
        Penalty
      </Flex>
      <Flex direction={'column'} mr={'auto'}>
        <Flex size={'xs'} gap={1} h={'auto'}>
          <Icon as={GiHockey} boxSize={5} />
          <Text fontSize={'md'}>{shots[teamId]} shots</Text>
        </Flex>
        {isPast && (
          <Box mt={2} textAlign={teamId === TeamsEnum.GUEST ? 'right' : 'left'}>
            <Input
              type={'number'}
              w={'12'}
              h={'9'}
              px={1}
              textAlign={'center'}
              fontWeight={'bold'}
              min={0}
              max={999}
              value={shots[teamId]}
              onChange={(e) => setShots(teamId, e.target.value)}
            />
          </Box>
        )}
        {!isPast && (
          <Flex justify={'space-between'}>
            <IconButton
              aria-label={'set shots'}
              variant={'ghost'}
              size={'sm'}
              icon={<Icon as={FiMinus} boxSize={6} />}
              onClick={() => addShot(teamId, -1)}
            />
            <IconButton
              aria-label={'set shots'}
              variant={'ghost'}
              size={'sm'}
              icon={<Icon as={FiPlus} boxSize={6} />}
              onClick={() => addShot(teamId, 1)}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
