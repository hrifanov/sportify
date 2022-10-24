import { Container } from '@chakra-ui/react';

export function MainSection({ children, size, maxW, ...restProps }) {
  return (
    <Container
      maxW={maxW ?? `container.${size ?? 'xl'}`}
      as="section"
      mt={10}
      {...restProps}
    >
      {children}
    </Container>
  );
}
