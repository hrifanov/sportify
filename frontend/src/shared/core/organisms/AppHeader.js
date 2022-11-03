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
  Image,
} from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import { useAuthClient } from 'src/modules/auth/apollo/client';
import logoFull from 'src/assets/logo_full.png';

export default function AppHeader() {
  const { user, signOut } = useAuthClient();
  return (
    <Box as="header" py={3}>
      <Container maxW="container.xl">
        <Flex align={'center'}>
          <Heading flexShrink={0}>
            <Image src={logoFull} alt="Sportify logo" width={[100, 170]} objectFit="cover" />
          </Heading>
          <Spacer />
          {user && (
            <Popover>
              <PopoverTrigger>
                <Button py={5} variant="ghost" rightIcon={<FaUserCircle size={35} />}>
                  {user.userName}
                </Button>
              </PopoverTrigger>
              <PopoverContent w={40}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <Button variant="gray" w="full" onClick={signOut}>
                    Logout
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
