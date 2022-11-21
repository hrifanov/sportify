import { Box, Circle, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { GiWhistle } from 'react-icons/gi';
import { formatTimer } from 'src/utils/date.js';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useInteractiveMatchClient } from '../apollo/interactiveMatchClient.js';
import { formatPenaltyLength } from '../../../utils/match.js';
import { PenaltyEnum } from '../enums.js';

export const EventPenalty = ({ event }) => {
  const { getPlayer } = useInteractiveMatchClient();

  return (
    <Flex w={'full'} align={'center'} borderBottom={'1px solid #9FB2D1'} py={1} px={4}>
      <Flex flex={1} align={'center'} gap={4}>
        <Icon as={GiWhistle} boxSize={5} />
        <Flex w={'full'}>
          <Text fontWeight={'bold'}>{getPlayer(event.player).user.name}</Text>
          <Text mx={'auto'}>{PenaltyEnum[event.kind]}</Text>
        </Flex>
      </Flex>
      <Flex align={'center'} gap={5} direction={event.team === 'home' ? 'row' : 'row-reverse'}>
        <Circle bg={'white'} boxSize={1.5} />
        <Text fontSize={'md'} color={'white'}>
          {formatPenaltyLength(event.length)}
        </Text>
        <Box boxSize={1.5} />
      </Flex>
      <Flex flex={1} gap={6} align={'center'}>
        <Box ml={'auto'}>{formatTimer(event.time)}</Box>
        <Box>
          <Flex align={'center'}>
            <IconButton
              size={'sm'}
              aria-label={'edit'}
              icon={<Icon as={MdEdit} />}
              variant={'ghost'}
            />
            <IconButton
              size={'sm'}
              aria-label={'edit'}
              icon={<Icon as={MdDelete} />}
              variant={'ghost'}
            />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};
