import { Text } from '@chakra-ui/react';
import { GiCrosshair } from 'react-icons/gi';
import { formatScore } from 'src/utils/match.js';
import { Event } from 'src/modules/matches/molecules/Event';

export const EventGoal = ({ event, ...rest }) => {
  const playerInitials = event.player.name
    .trim()
    .split(' ')
    .map((name) => `${name[0]}.`)
    .join(' ');

  return (
    <Event
      event={event}
      icon={GiCrosshair}
      title={event.player.name}
      alternativeTitle={playerInitials}
      valueSlot={
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight={'bold'}>
          {formatScore(event.score)}
        </Text>
      }
      {...rest}
    />
  );
};
