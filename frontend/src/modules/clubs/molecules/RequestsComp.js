import { Box, Text, Show } from '@chakra-ui/react';
export default function RequestsComp() {
  return (
    <Show above="md">
      <Box w="full" h="full" bg="brand.boxBackground" borderRadius="base" py={4} px={5}>
        <Text fontWeight="bold" color="brand.title" fontSize="xl">
          Join requests
        </Text>
      </Box>
    </Show>
  );
}
