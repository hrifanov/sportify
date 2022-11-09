import { PlayerItem } from '../molecules/PlayerItem';
import { Box } from '@chakra-ui/react';

export function PlayersList() {
  return (
    <Box>
      <PlayerItem name="Petr" email="kjepii@gmail.com" hasAccepted={true} isAdmin={true} />
      <PlayerItem name="Dalsi hrac" email="dalsi@gmail.com" hasAccepted={false} isAdmin={false} />
    </Box>
  );
}
