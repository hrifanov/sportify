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
import { FiArrowLeftCircle, FiSettings } from 'react-icons/fi';
import RequestsComp from '../molecules/RequestsComp';
import { route } from '../../../Routes.js';
import { ClubDetailInformation } from '../organisms/ClubDetailInformation';
import { ClubDetailSeasons } from '../organisms/ClubDetailSeasons';

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
              <ClubDetailInformation club={club} isCurrUserAdmin={isCurrUserAdmin} />
              <ClubDetailSeasons clubId={club.id} />
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
              w={{ md: '49%' }}
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
              w={{ md: '31%' }}
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
