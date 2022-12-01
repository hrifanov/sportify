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
  Image,
  Spacer,
  Show,
} from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import { useAuthClient } from 'src/modules/auth/apollo/client';
import logo from 'src/assets/logo.svg';
import logoFull from 'src/assets/logo_full.png';
import { RouterLink } from 'src/shared/navigation';

export default function AppHeader({ inApp = true, title }) {
  const headerBg = inApp ? 'transparent' : 'brand.boxBackground';

  const { user, signOut } = useAuthClient();
  return (
    <Box as="header" pt={5} pb={3} bg={headerBg}>
      <Container maxW="container.xl">
        <Flex align={'center'}>
          <RouterLink to={'/'}>
            <Image
              src={inApp ? logo : logoFull}
              alt="Sportify logo"
              width={inApp ? ['40px', '80px'] : ['100px', '170px']}
              objectFit="cover"
              mr={5}
            />
          </RouterLink>
          <Heading mx={['auto', 0]} size={['', 'xl']}>
            {title}
          </Heading>
          <Spacer />
          {user && (
            <Popover>
              <PopoverTrigger>
                <Button py={5} variant="ghost" rightIcon={<FaUserCircle size={35} />}>
                  <Show above="sm">{user.userName}</Show>
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
