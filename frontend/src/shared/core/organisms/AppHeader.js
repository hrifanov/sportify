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
import { useNavigate } from 'react-router-dom';
import { useClubStore } from 'src/modules/clubs/store/clubStore';
import { route } from 'src/Routes';
import { ClubLogo } from 'src/modules/clubs/atoms/ClubLogo';

export default function AppHeader({ inApp = true, title }) {
  const headerBg = inApp ? 'transparent' : 'brand.boxBackground';
  const { activeClub } = useClubStore();
  const { user, signOut } = useAuthClient();
  const navigate = useNavigate();

  if (!title) {
    title = activeClub?.name;
  }

  function onHeaderClick() {
    if (activeClub) {
      return navigate(route.clubDetail(activeClub.id));
    }

    navigate(route.dashboard());
  }

  return (
    <Box as="header" pt={5} pb={3} bg={headerBg}>
      <Container maxW="container.xl">
        <Flex align={'center'}>
          <Flex align={'center'} cursor={'pointer'} onClick={onHeaderClick}>
            <Image
              display={{ base: 'none', md: 'block' }}
              src={inApp ? logo : logoFull}
              alt="Sportify logo"
              width={inApp ? ['40px', '80px'] : ['100px', '170px']}
              objectFit="cover"
              mr={5}
            />

            {activeClub?.imageURL && <ClubLogo club={activeClub} size={50} mr={5} />}
            <Heading mx={['auto', 0]} size={['', 'xl']}>
              {title}
            </Heading>
          </Flex>
          <Spacer />
          {user && (
            <>
              <Popover>
                <PopoverTrigger>
                  <Button py={5} mr={4} variant="ghost" rightIcon={<FaUserCircle size={35} />}>
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
              <Button variant={'outline'} size={'sm'} onClick={() => navigate(route.dashboard())}>
                Dashboard
              </Button>
            </>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
