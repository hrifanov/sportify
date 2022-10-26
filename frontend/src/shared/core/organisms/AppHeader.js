import {
  Box,
  Container,
  Flex,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Spacer,
} from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectUser } from 'src/modules/auth/authSlice';

export default function AppHeader() {
  const user = useSelector(selectUser);

  return (
    <Box as="header" py={3}>
      <Container maxW="container.xl">
        <Flex>
          <Heading>Sportify</Heading>
          <Spacer />
          {user && (
            <Popover>
              <PopoverTrigger>
                <Button variant="ghost" rightIcon={<FaUserCircle size={35} />}>
                  {user.username}
                </Button>
              </PopoverTrigger>
              <PopoverContent w={40}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <Button w="full">Logout</Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
