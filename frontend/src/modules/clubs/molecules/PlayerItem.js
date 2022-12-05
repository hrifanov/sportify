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
          px={3}
          py={2}
          border="1px"
          mt={3}
          borderRadius={8}
          w="full"
        >
          <Image
            src={`https://i.pravatar.cc/100?u=${player.id}`}
            alt="Dan Abramov"
            boxSize="30px"
            borderRadius="50%"
          />
          <Flex direction={['column', '', '', 'row']} align={['baseline']}>
            <Text ml={5} width="150px">
              {player.name}
            </Text>
            <Text>{player.email}</Text>
          </Flex>
          <Spacer />
          <Box>
            {hasAccepted && <BsFillPersonFill size={20} />}
            {!hasAccepted && <BsQuestionLg size={20} />}
          </Box>
          <Box ml={2} position="relative">
            <PlayerPopoverMenu
              clubId={clubId}
              removePlayerRQ={removePlayerRQ}
              isAdmin={player.isAdmin}
              makePlayerAdminRQ={makePlayerAdminRQ}
              playerId={player.id}
              setDisplayPlayer={setDisplayPlayer}
              minW={100}
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
