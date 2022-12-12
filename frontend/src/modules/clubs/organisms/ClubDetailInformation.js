import { Box, Flex, Table, TableContainer, Td, Text, Tr, Icon, Tbody } from '@chakra-ui/react';
import { RouterLink } from 'src/shared/navigation';
import { FiArrowLeftCircle, FiSettings } from 'react-icons/fi';
import { route } from '../../../Routes.js';
import { ClubLogo } from 'src/modules/clubs/atoms/ClubLogo';

export const ClubDetailInformation = ({ club, clubLocalityLabel, isCurrUserAdmin }) => {
  return (
    <Box h="full" w="full" bg="brand.boxBackground" borderRadius="base" pt={4} pb={6} px={5}>
      <Flex direction="row" align="center">
        <Flex as={RouterLink} to={route.dashboard()} color="brand.title" align="center">
          <Icon as={FiArrowLeftCircle} boxSize={6} />
        </Flex>

        <Text fontWeight="bold" color="brand.title" fontSize="xl" pl={2}>
          Information
        </Text>
      </Flex>
      <Flex alignItems="center" gap={4} mt={2}>
        <ClubLogo club={club} />
        <Box>
          <Text textTransform="uppercase" fontWeight="bold">
            {club.name}
          </Text>
          <Text color="brand.secondary">{club.sport}</Text>
        </Box>
      </Flex>
      <TableContainer mt={4}>
        <Table variant="unstyled">
          <Tbody>
            <Tr>
              <Td py={1} pl={0} pr={3} fontWeight="bold">
                Locality:
              </Td>
              <Td w="full" py={1} px={0}>
                {clubLocalityLabel}
              </Td>
            </Tr>
            <Tr>
              <Td py={1} pl={0} pr={3} fontWeight="bold">
                Leader:
              </Td>
              <Td w="full" py={1} px={0}>
                John Doe
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      {isCurrUserAdmin && (
        <>
          <Flex
            as={RouterLink}
            mt={5}
            to={route.clubEdit(club.id)}
            color="brand.secondary"
            alignItems="center"
            gap={2}
          >
            <Icon as={FiSettings} />
            Manage team
          </Flex>

          <Flex
            as={RouterLink}
            mt={5}
            to={route.manageSeasons(club.id)}
            color="brand.secondary"
            alignItems="center"
            gap={2}
          >
            <Icon as={FiSettings} />
            Manage Seasons
          </Flex>
        </>
      )}
    </Box>
  );
};
