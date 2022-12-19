import {
  Popover,
  Button,
  PopoverTrigger,
  PopoverBody,
  PopoverContent,
  Flex,
  Box,
} from '@chakra-ui/react';

import { BsThreeDots } from 'react-icons/bs';
import { useAuthClient } from 'src/modules/auth/apollo/client';

export function PlayerPopoverMenu({
  clubId,
  isAdmin,
  removePlayerRQ,
  player,
  setDisplayPlayer,
  makePlayerAdminRQ,
}) {
  const { user } = useAuthClient();

  if (user.id === player.id) return <Box boxSize={'32px'} />;

  return (
    <Popover border={0} ml={5}>
      <PopoverTrigger>
        <Button variant="ghost" size={'sm'}>
          <BsThreeDots
            size={25}
            variant="light"
            as={Button}
            w="full"
            m={0}
            cursor="pointer"
            gap={2}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent maxW={['40']} bg="#3E4A66" border="0px">
        <PopoverBody as={Flex} gap={2} direction="column" border="0px">
          {user.id !== player.id && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                removePlayerRQ.onSubmit({ clubId: clubId, userId: player.id }, setDisplayPlayer);
              }}
            >
              Remove player
            </Button>
          )}
          {!!player.userName && (
            <>
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={async () => {
                    await makePlayerAdminRQ.onSubmit({
                      clubId: clubId,
                      userId: player.id,
                      isAdmin: false,
                    });
                    // navigate(route.clubDetail);
                    makePlayerAdminRQ.refetch();
                  }}
                >
                  UnAdmin
                </Button>
              )}
              {!isAdmin && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={async () => {
                    await makePlayerAdminRQ.onSubmit({
                      clubId: clubId,
                      userId: player.id,
                      isAdmin: true,
                    });
                    makePlayerAdminRQ.refetch();
                  }}
                >
                  Make admin
                </Button>
              )}
            </>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
