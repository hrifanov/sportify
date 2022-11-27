import { Box, Circle, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { GiCrosshair } from 'react-icons/gi';
import { formatTimer } from 'src/utils/date.js';
import { MdEdit, MdDelete } from 'react-icons/md';
import { formatScore } from 'src/utils/match.js';
import {
  INTERACTIVE_MATCH_ACTIONS,
  useInteractiveMatchStore,
} from 'src/modules/matches/store/interactiveMatchStore';

export const Event = ({ event, icon, title, valueSlot, readonly }) => {
  const { uiAction } = useInteractiveMatchStore();

  return (
    <Flex w={'full'} align={'center'} borderBottom={'1px solid #9FB2D1'} py={1} px={4}>
      <Flex flex={1} align={'center'} gap={4}>
        <Icon as={icon} boxSize={5} />
        <Text fontWeight={'bold'}>{title}</Text>
      </Flex>
      <Flex align={'center'} gap={5} direction={event.team === 'home' ? 'row' : 'row-reverse'}>
        <Circle bg={'white'} boxSize={1.5} />
        {valueSlot}
        <Box boxSize={1.5} />
      </Flex>
      <Flex flex={1} gap={6} align={'center'}>
        <Box ml={'auto'}>{formatTimer(event.time)}</Box>
        {!readonly && (
          <Box>
            <Flex align={'center'}>
              <IconButton
                size={'sm'}
                aria-label={'edit'}
                icon={<Icon as={MdEdit} />}
                variant={'ghost'}
                onClick={() => uiAction(event.type, { teamId: event.data.teamId, event })}
              />
              <IconButton
                size={'sm'}
                aria-label={'edit'}
                icon={<Icon as={MdDelete} />}
                variant={'ghost'}
                onClick={() => uiAction(INTERACTIVE_MATCH_ACTIONS.DELETE_EVENT, { event })}
              />
            </Flex>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};
