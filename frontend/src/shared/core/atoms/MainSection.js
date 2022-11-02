import { Container } from '@chakra-ui/react';

export function MainSection({ children, size, maxW, ...restProps }) {
  return (
    <Container
      maxW={maxW ?? `container.${size ?? 'xl'}`}
      as="section"
      my={10}
      {...restProps}
    >
      {children}
    </Container>
  );
}
