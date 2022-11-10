import { PlayerItem } from '../molecules/PlayerItem';
import { Box } from '@chakra-ui/react';

export function PlayersList(players) {
  players = players.players;
  players.forEach((player) => {
    console.log(player.name);
  });
  return (
    <Box>
      {players &&
        players.map((player) => {
          return <PlayerItem player={player} hasAccepted={true} isAdmin={true} />;
        })}
    </Box>
  );
}
