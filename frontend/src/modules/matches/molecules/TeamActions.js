import { Button, Flex, GridItem, Icon, IconButton, Text } from '@chakra-ui/react';
import { GiCrosshair, GiHockey, GiWhistle } from 'react-icons/gi';
import { MdEdit } from 'react-icons/md';
import { FiMinus, FiPlus } from 'react-icons/fi';
import {
  getShots,
  INTERACTIVE_MATCH_ACTIONS,
  teamAction,
  useInteractiveMatchClient,
} from 'src/modules/matches/apollo/interactiveMatchClient';
import { TeamsEnum } from 'src/modules/matches/enums';

export const TeamActions = ({ teamId }) => {
  const { addShots, teamAction, getShots } = useInteractiveMatchClient();

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
        onClick={() => teamAction({ action: INTERACTIVE_MATCH_ACTIONS.GOAL, teamId })}
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
        onClick={() => teamAction({ action: INTERACTIVE_MATCH_ACTIONS.PENALTY, teamId })}
      >
        <Icon as={GiWhistle} boxSize={8} />
        Penalty
      </Flex>
      <Flex direction={'column'}>
        <Flex size={'xs'} gap={1} h={'auto'}>
          <Icon as={GiHockey} boxSize={5} />
          <Text fontSize={'md'}>{getShots(teamId)} shots</Text>
        </Flex>
        <Flex justify={'space-between'}>
          <IconButton
            aria-label={'set shots'}
            variant={'ghost'}
            size={'sm'}
            icon={<Icon as={FiMinus} boxSize={6} />}
            onClick={() => addShots(teamId, -1)}
          />
          <IconButton
            aria-label={'set shots'}
            variant={'ghost'}
            size={'sm'}
            icon={<Icon as={FiPlus} boxSize={6} />}
            onClick={() => addShots(teamId, 1)}
          />
        </Flex>
      </Flex>
    </GridItem>
  );
};
