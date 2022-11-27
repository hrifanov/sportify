import { Box, Circle, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { GiCrosshair, GiWhistle } from 'react-icons/gi';
import { formatTimer } from 'src/utils/date.js';
import { MdEdit, MdDelete } from 'react-icons/md';
import { formatPenaltyLength, formatScore } from 'src/utils/match';
import { PenaltyEnum } from '../enums.js';
import { Event } from 'src/modules/matches/molecules/Event';

export const EventPenalty = ({ event, ...rest }) => {
  return (
    <Event
      event={event}
      icon={GiWhistle}
      title={event.player.name}
      valueSlot={<Text fontSize={'md'}>{formatPenaltyLength(event.data.length)}</Text>}
      {...rest}
    />
  );
};
