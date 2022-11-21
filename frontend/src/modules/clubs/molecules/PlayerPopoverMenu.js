import {
  Popover,
  Button,
  PopoverTrigger,
  PopoverBody,
  PopoverContent,
  Flex,
} from '@chakra-ui/react';

import { BsThreeDots } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export function PlayerPopoverMenu({
  clubId,
  isAdmin,
  removePlayerRQ,
  playerId,
  setDisplayPlayer,
  makePlayerAdminRQ,
}) {
  return (
    <Popover border={0}>
      <PopoverTrigger>
        <Button variant="ghost">
          <BsThreeDots
            size={37}
            variant="light"
            as={Button}
            w="full"
            m={0}
            cursor="pointer"
            gap={2}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent maxW={{ md: 40 }} bg="#3E4A66" border="0px">
        <PopoverBody as={Flex} gap={2} direction="column" border="0px">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              removePlayerRQ.onSubmit({ clubId: clubId, userId: playerId }, setDisplayPlayer);
            }}
          >
            Remove player
          </Button>
          {isAdmin && (
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                await makePlayerAdminRQ.onSubmit({
                  clubId: clubId,
                  userId: playerId,
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
                  userId: playerId,
                  isAdmin: true,
                });
                makePlayerAdminRQ.refetch();
              }}
            >
              Make admin
            </Button>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
