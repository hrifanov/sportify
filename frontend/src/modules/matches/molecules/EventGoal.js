import { Box, Circle, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { GiCrosshair } from 'react-icons/gi';
import { formatTimer } from 'src/utils/date.js';
import { MdEdit, MdDelete } from 'react-icons/md';
import { formatScore } from 'src/utils/match.js';
import { Event } from 'src/modules/matches/molecules/Event';

export const EventGoal = ({ event, ...rest }) => {
  return (
    <Event
      event={event}
      icon={GiCrosshair}
      title={event.player.name}
      valueSlot={
        <Text fontSize={'lg'} fontWeight={'bold'}>
          {formatScore(event.score)}
        </Text>
      }
      {...rest}
    />
  );
};
