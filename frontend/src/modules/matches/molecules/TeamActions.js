import { Button, Flex, GridItem, Icon, IconButton, Text } from '@chakra-ui/react';
import { GiCrosshair, GiHockey, GiWhistle } from 'react-icons/gi';
import { MdEdit } from 'react-icons/md';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { TeamsEnum } from 'src/modules/matches/enums';
import {
  INTERACTIVE_MATCH_ACTIONS,
  useInteractiveMatchStore,
} from 'src/modules/matches/store/interactiveMatchStore';

export const TeamActions = ({ teamId }) => {
  const { addShot, uiAction, shots } = useInteractiveMatchStore();

  return (
    <GridItem
      as={Flex}
      align={'center'}
      gap={2}
      direction={teamId === TeamsEnum.GUEST && 'row-reverse'}
    >
      <Flex
        as={Button}
        variant={'ghost'}
        direction={'column'}
        gap={1}
        h={'auto'}
        onClick={() => uiAction(INTERACTIVE_MATCH_ACTIONS.GOAL, { teamId })}
      >
        <Icon as={GiCrosshair} boxSize={8} />
        Goal
      </Flex>
      <Flex
        as={Button}
        variant={'ghost'}
        direction={'column'}
        gap={1}
        h={'auto'}
        onClick={() => uiAction(INTERACTIVE_MATCH_ACTIONS.PENALTY, { teamId })}
      >
        <Icon as={GiWhistle} boxSize={8} />
        Penalty
      </Flex>
      <Flex direction={'column'}>
        <Flex size={'xs'} gap={1} h={'auto'}>
          <Icon as={GiHockey} boxSize={5} />
          <Text fontSize={'md'}>{shots[teamId]} shots</Text>
        </Flex>
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
      </Flex>
    </GridItem>
  );
};
