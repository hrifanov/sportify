import { QuackerIcon } from '../icons';
import { Box, Flex, Icon, Stack } from '../atoms';

export function Loading() {
  return (
    <Flex
      justifyContent="center"
      color="gray.500"
      fontSize="lg"
      fontWeight="bold"
    >
      <Stack p="6" spacing="4" direction="row" alignItems="center">
        <Icon as={QuackerIcon} isSpinning />
        <Box>Loading...</Box>
      </Stack>
    </Flex>
  );
}
