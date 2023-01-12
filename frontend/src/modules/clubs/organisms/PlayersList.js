import { PlayerItem } from '../molecules/PlayerItem';
import { Box, Text } from '@chakra-ui/react';

export function PlayersList(
  { clubId, players, removePlayerRQ, makePlayerAdminRQ, isCurrUserAdmin },
  { ...props },
) {
  return (
    <Box overflowX={'hidden'} minH="150px" h={'full'} maxHeight="600px">
      {players?.map((player) => {
        return (
          <PlayerItem
            clubId={clubId}
            player={player}
            hasAccepted={true}
            isAdmin={true}
            removePlayerRQ={removePlayerRQ}
            makePlayerAdminRQ={makePlayerAdminRQ}
            key={player.id}
            isCurrUserAdmin={isCurrUserAdmin}
          />
        );
      })}
      {!players && (
        <Box mt={4}>
          <Text as="i">There are no players at this club :( Add some friends to play with! </Text>
        </Box>
      )}
    </Box>
  );
}
