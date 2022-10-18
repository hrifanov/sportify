import { Link as ChakraLink } from '@chakra-ui/react';

export function Link({ noUnderline, ...rest }) {
  return (
    <ChakraLink
      color="green.600"
      _hover={{ textDecoration: noUnderline ? 'none' : 'underline' }}
      {...rest}
    />
  );
}
