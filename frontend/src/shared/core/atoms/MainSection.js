import { Container } from '@chakra-ui/react';
import AppHeader from '../organisms/AppHeader.js';

export function MainSection({ children, containerProps = {}, headerProps = {} }) {
  return (
    <>
      <AppHeader {...headerProps} />
      <Container maxW="container.xl" as="main" {...containerProps}>
        {children}
      </Container>
    </>
  );
}
