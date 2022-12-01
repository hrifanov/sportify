import { Container, Flex } from '@chakra-ui/react';
import AppHeader from '../organisms/AppHeader.js';

export function MainSection({ children, containerProps = {}, headerProps = {} }) {
  return (
    <Flex direction={'column'} height={'100%'}>
      <AppHeader {...headerProps} />
      <Container maxW="container.xl" as="main" {...containerProps} flexGrow={1} minHeight={0}>
        {children}
      </Container>
    </Flex>
  );
}
