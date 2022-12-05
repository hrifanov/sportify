import { Text } from '@chakra-ui/react';
import { GiWhistle } from 'react-icons/gi';
import { Event } from 'src/modules/matches/molecules/Event';

export const EventPenalty = ({ event, ...rest }) => {
  const playerInitials = event.player.name
    .trim()
    .split(' ')
    .map((name) => `${name[0]}.`)
    .join(' ');

  return (
    <Event
      event={event}
      icon={GiWhistle}
      title={event.player.name}
      alternativeTitle={playerInitials}
      valueSlot={<Text fontSize={{ base: 'sm', md: 'md' }}>{event.data.length}</Text>}
      {...rest}
    />
  );
};
