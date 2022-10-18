import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  AvatarPhoto,
  Box,
  Button,
  CloseIcon,
  Flex,
  HamburgerMenuIcon,
  Icon,
  IconButton,
  QuackerIcon,
  Stack,
  useDisclosure,
} from 'src/shared/design-system';

import { useAuth } from 'src/modules/auth';
import { route, PRACTICALS } from 'src/Routes';

import { RouterLink, RouterNavLink, ReactRouterLink } from '../atoms';

const baseLinks = [
  { to: route.home(), title: 'Home' },
  ...PRACTICALS.map(({ id }) => ({
    to: route.practical(id),
    title: `${id}`,
  })),
  { to: route.about(), title: 'About' },
];

export function TopNavigation() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const mobileNav = useDisclosure();
  const location = useLocation();

  const closeHamburgerMenu = mobileNav.onClose;
  useEffect(
    function closeHamburgerMenuOnLocationChange() {
      closeHamburgerMenu();
    },
    [location, closeHamburgerMenu],
  );

  return (
    <Box as="nav" color="white" bg="green.700">
      <Flex justifyContent="space-between">
        <RouterLink
          to={route.home()}
          noUnderline
          color="white"
          fontWeight="bold"
          display="flex"
          alignItems="center"
          py="3"
          px="4"
        >
          <Icon as={QuackerIcon} mr="2" fontSize="xl" />
          Quacker
        </RouterLink>
        <Flex alignItems="stretch">
          <Flex display={{ base: 'none', md: 'flex' }}>
            {baseLinks.map(({ to, title }) => (
              <RouterNavLink to={to} key={to}>
                {title}
              </RouterNavLink>
            ))}
          </Flex>
          {user ? (
            <>
              <RouterNavLink to={route.userDetail(user.userName)} py="0">
                <AvatarPhoto
                  src={user.profileImageUrl}
                  alt={user.userName}
                  size="6"
                />
                <Box ml="2" display={{ base: 'none', sm: 'block' }}>
                  {user.name}
                </Box>
              </RouterNavLink>
              <Flex alignItems="center">
                <Button
                  colorScheme="green"
                  size="sm"
                  mx={{ base: '2', sm: '4' }}
                  onClick={() => {
                    signout();
                    navigate(route.home());
                    window.location.reload();
                  }}
                >
                  Sign Out
                </Button>
              </Flex>
            </>
          ) : (
            <>
              <RouterNavLink to={route.signIn()}>Sign In</RouterNavLink>
              <Flex alignItems="center">
                <Button
                  colorScheme="green"
                  size="sm"
                  mx={{ base: '2', sm: '4' }}
                  to={route.signUp()}
                  as={ReactRouterLink}
                >
                  Sign Up
                </Button>
              </Flex>
            </>
          )}

          <IconButton
            color="white"
            _hover={{ bg: 'green.600' }}
            _active={{ bg: 'green.500' }}
            display={{ base: 'flex', md: 'none' }}
            alignSelf="center"
            aria-label="Open menu"
            variant="ghost"
            fontSize="lg"
            icon={mobileNav.isOpen ? <CloseIcon /> : <HamburgerMenuIcon />}
            onClick={mobileNav.onToggle}
            mr="2"
          />
        </Flex>
      </Flex>
      <Stack
        spacing="0"
        display={{ base: mobileNav.isOpen ? 'flex' : 'none', md: 'none' }}
      >
        {baseLinks.map(({ to, title }) => (
          <RouterNavLink to={to} key={to}>
            {title}
          </RouterNavLink>
        ))}
      </Stack>
    </Box>
  );
}
