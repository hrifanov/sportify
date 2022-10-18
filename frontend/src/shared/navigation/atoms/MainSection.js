import { Box, Center } from 'src/shared/design-system';

export function MainSection({ children, ...restProps }) {
  return (
    <Center borderTop="1px" borderColor="blackAlpha.200">
      <Box as="section" m="4" minW="30rem" {...restProps}>
        {children}
      </Box>
    </Center>
  );
}
