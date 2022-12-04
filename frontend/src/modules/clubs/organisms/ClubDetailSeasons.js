import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';
import { route } from 'src/Routes';
import { RouterLink } from 'src/shared/navigation';

export const ClubDetailSeasons = (clubId) => (
  <Box w="full" bg="brand.boxBackground" borderRadius="base" pt={4} pb={6} px={5}>
    <Text fontWeight="bold" color="brand.title" fontSize="xl">
      Seasons
    </Text>
    <Flex
      as={RouterLink}
      mt={5}
      to={route.manageSeasons(clubId.clubId)}
      color="brand.secondary"
      alignItems="center"
      gap={2}
    >
      <Icon as={FiSettings} />
      Manage Seasons
    </Flex>
  </Box>
);
