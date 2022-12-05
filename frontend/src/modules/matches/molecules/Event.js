import { Box, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { formatTimer } from 'src/utils/date.js';
import { MdEdit, MdDelete } from 'react-icons/md';
import {
  INTERACTIVE_MATCH_ACTIONS,
  useInteractiveMatchStore,
} from 'src/modules/matches/store/interactiveMatchStore';

export const Event = ({ event, icon, title, alternativeTitle, valueSlot, readonly }) => {
  const { uiAction } = useInteractiveMatchStore();

  return (
    <Flex w={'full'} align={'center'} borderBottom={'1px solid #9FB2D1'} py={1} px={{ md: 4 }}>
      <Flex flex={{ md: 1 }} align={'center'} gap={{ md: 4 }}>
        <Text display={{ base: 'none', md: 'block' }}>{title}</Text>
        <Text display={{ base: 'block', md: 'none' }}>{alternativeTitle}</Text>
      </Flex>
      <Flex
        align={'center'}
        justify={'space-between'}
        direction={event.data.teamId === 'home' ? 'row' : 'row-reverse'}
        w={{ base: '6.5rem', md: '32' }}
        mx={'auto'}
      >
        <Icon as={icon} boxSize={{ base: 5, md: 6 }} />
        {valueSlot}
        <Box boxSize={{ base: 5, md: 6 }} />
      </Flex>
      <Flex flex={{ md: 1 }} gap={{ md: 6 }} align={'center'}>
        <Box fontSize={{ base: 'sm', md: 'md' }} ml={'auto'}>
          {formatTimer(event.time)}
        </Box>
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
