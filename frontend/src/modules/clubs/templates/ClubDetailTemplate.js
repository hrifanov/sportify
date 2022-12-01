import AppHeader from 'src/shared/core/organisms/AppHeader';
import {
  Box,
  Container,
  Flex,
  Image,
  Table,
  TableContainer,
  Td,
  Text,
  Tr,
  Icon,
  Tbody,
  Spinner,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
} from '@chakra-ui/react';
import { RouterLink } from 'src/shared/navigation';
import StatisticsComp from '../molecules/StatisticsComp';
import MatchesComp from '../molecules/MatchesComp';
import { FiSettings } from 'react-icons/fi';
import RequestsComp from '../molecules/RequestsComp';
import { route } from '../../../Routes.js';

export default function ClubDetailTemplate({ club, loading, matches, players, isCurrUserAdmin }) {
  return (
    <Flex direction="column" h={{ md: '100vh' }}>
      <AppHeader title="Club detail" />
      <Container maxW="container.xl" h="full" minHeight={0} my={5}>
        {loading && (
          <Flex h="full" bg="brand.boxBackground" alignItems="center" justifyContent="center">
            <Spinner />
          </Flex>
        )}
        {club && (
          <Flex gap={6} h="full" direction={['column', null, 'row']}>
            <Flex direction="column" w={{ md: '20%' }} gap={4}>
              <Box w="full" bg="brand.boxBackground" borderRadius="base" pt={4} pb={6} px={5}>
                <Text fontWeight="bold" color="brand.title" fontSize="xl">
                  Information
                </Text>
                <Flex alignItems="center" gap={4} mt={2}>
                  <Image src={require('src/assets/club.png')} w="100px" h="100px" />
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
                          {club.locality}
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
                  <Flex
                    as={RouterLink}
                    mt={5}
                    to={route.clubEdit()}
                    color="brand.secondary"
                    alignItems="center"
                    gap={2}
                  >
                    <Icon as={FiSettings} />
                    Manage team
                  </Flex>
                )}
              </Box>
              <RequestsComp></RequestsComp>
            </Flex>
            <Tabs display={{ md: 'none' }} isFitted>
              <TabList>
                <Tab>Players</Tab>
                <Tab>Matches</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {players && <StatisticsComp players={players}></StatisticsComp>}
                </TabPanel>
                <TabPanel>{matches && <MatchesComp matches={matches}></MatchesComp>}</TabPanel>
              </TabPanels>
            </Tabs>
            <Flex
              direction="column"
              w={{ md: '50%' }}
              minW={0}
              h="full"
              bg="brand.boxBackground"
              borderRadius="base"
              py={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {players && <StatisticsComp players={players}></StatisticsComp>}
            </Flex>
            <Flex
              direction="column"
              borderRadius="base"
              w={{ md: '30%' }}
              h="97%"
              gap={4}
              display={{ base: 'none', md: 'flex' }}
              bg="brand.boxBackground"
            >
              {matches && <MatchesComp matches={matches}></MatchesComp>}
            </Flex>
          </Flex>
        )}
      </Container>
    </Flex>
  );
}
