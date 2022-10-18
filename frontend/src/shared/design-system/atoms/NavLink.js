import { Link as ChakraLink } from '@chakra-ui/react';

export function NavLink(props) {
  return (
    <ChakraLink
      fontSize="sm"
      px="4"
      py="3"
      display="flex"
      alignItems="center"
      _hover={{
        bg: 'blackAlpha.400',
      }}
      _activeLink={{
        bg: 'blackAlpha.300',
        _hover: {
          bg: 'blackAlpha.400',
        },
      }}
      {...props}
    />
  );
}
