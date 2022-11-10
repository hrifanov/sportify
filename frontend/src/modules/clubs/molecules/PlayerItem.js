import {
  Box,
  Popover,
  Button,
  PopoverTrigger,
  PopoverBody,
  PopoverContent,
  Flex,
  Image,
  Text,
  Spacer,
} from '@chakra-ui/react';
import { BsFillPersonFill, BsQuestionLg, BsThreeDots } from 'react-icons/bs';

export function PlayerItem({ player, hasAccepted, isAdmin }) {
  return (
    <Flex gap={[2, null, 5]} alignItems={{ md: 'center' }} direction={['column', null, 'row']}>
      <Flex direction="row" alignItems="center" p={3} border="1px" mt={3} borderRadius={8} w="full">
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
        <Spacer />
        <Box>
          {hasAccepted && <BsFillPersonFill size={37} />}
          {!hasAccepted && <BsQuestionLg size={37} />}
        </Box>
        <Box ml={4} position="relative">
          <Popover>
            <PopoverTrigger>
              <BsThreeDots
                size={37}
                variant="light"
                as={Flex}
                alignItems="center"
                w="full"
                maxW={{ md: 40 }}
                m={0}
                cursor="pointer"
                gap={2}
              />
            </PopoverTrigger>
            <PopoverContent maxW={{ md: 40 }} bg="#3E4A66" border={0}>
              <PopoverBody as={Flex} gap={2} direction="column">
                <Button variant="popup" size="sm">
                  Remove player
                </Button>
                {isAdmin && (
                  <Button variant="popup" size="sm">
                    UnAdmin
                  </Button>
                )}
                {!isAdmin && (
                  <Button variant="ghost" size="sm">
                    Make admin
                  </Button>
                )}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      </Flex>
    </Flex>
  );
}
