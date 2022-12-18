import { PlayerItem } from '../molecules/PlayerItem';
import { Box, Text } from '@chakra-ui/react';

export function PlayersList({ club, removePlayerRQ, makePlayerAdminRQ }, { ...props }) {
  return (
    <Box overflowX={'hidden'} minH="150px" h={'full'} maxHeight="600px">
      {club.players &&
        club.players.map((player) => {
          return (
            <PlayerItem
              clubId={club.id}
              player={player}
              hasAccepted={true}
              isAdmin={true}
              removePlayerRQ={removePlayerRQ}
              makePlayerAdminRQ={makePlayerAdminRQ}
              key={player.id}
            />
          );
        })}
      {!club.players && (
        <Box mt={4}>
          <Text as="i">There are no players at this club :( Add some friends to play with! </Text>
        </Box>
      )}
    </Box>
  );
}
