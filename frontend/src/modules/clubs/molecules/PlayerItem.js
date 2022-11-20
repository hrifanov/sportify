import { Box, Flex, Image, Text, Spacer } from '@chakra-ui/react';
import { BsFillPersonFill, BsQuestionLg } from 'react-icons/bs';
import { PlayerPopoverMenu } from './PlayerPopoverMenu';
import { useState } from 'react';

export function PlayerItem({ clubId, player, hasAccepted, removePlayerRQ, makePlayerAdminRQ }) {
  //Řešení prozatím (asi)
  const [displayPlayer, setDisplayPlayer] = useState(true);

  if (displayPlayer) {
    return (
      <Flex gap={[2, null, 5]} alignItems={{ md: 'center' }} direction={['column', null, 'row']}>
        <Flex
          direction="row"
          alignItems="center"
          p={3}
          border="1px"
          mt={3}
          borderRadius={8}
          w="full"
        >
          <Image
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
            boxSize="50px"
            borderRadius="50%"
          />
          <Text as="b" ml={5} width="150px">
            {player.name}
          </Text>
          <Text>{player.email}</Text>
          <Spacer />
          <Box>
            {hasAccepted && <BsFillPersonFill size={37} />}
            {!hasAccepted && <BsQuestionLg size={37} />}
          </Box>
          <Box ml={4} position="relative">
            <PlayerPopoverMenu
              clubId={clubId}
              removePlayerRQ={removePlayerRQ}
              isAdmin={player.isAdmin}
              makePlayerAdminRQ={makePlayerAdminRQ}
              playerId={player.id}
              setDisplayPlayer={setDisplayPlayer}
            />
          </Box>
        </Flex>
      </Flex>
    );
  }
  if (!displayPlayer) {
    return null;
  }
}
