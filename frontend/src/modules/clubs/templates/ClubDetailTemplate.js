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
  Spacer,
  Select,
} from '@chakra-ui/react';
import { RouterLink } from 'src/shared/navigation';
import Statistics from 'src/modules/matches/molecules/Statistics';
import MatchesComp from '../molecules/MatchesComp';
import { FiArrowLeftCircle, FiSettings } from 'react-icons/fi';
import RequestsComp from '../molecules/RequestsComp';
import { route } from '../../../Routes.js';
import { ClubDetailInformation } from '../organisms/ClubDetailInformation';
import { ClubDetailSeasons } from '../organisms/ClubDetailSeasons';
import { MainSection } from 'src/shared/core/atoms/MainSection';
import { FullPageSpinner } from 'src/shared/design-system/atoms/FullPageSpinner';
import { RoleEnum } from 'src/modules/matches/enums';
import { useEffect, useState } from 'react';
import { find } from 'lodash';
import { StatisticsFilter } from 'src/modules/clubs/molecules/StatisticsFilter';

export default function ClubDetailTemplate({ club, loading, matches, players, isCurrUserAdmin }) {
  const [roleFilter, setRoleFilter] = useState(RoleEnum.ATTACK);
  const [seasonFilter, setSeasonFilter] = useState(null);

  useEffect(() => {
    setSeasonFilter(club.seasons[0].id);
  }, [club]);

  if (loading) {
    return <FullPageSpinner />;
  }

  const statistics = find(club.seasons, { id: seasonFilter })?.statistics;

  return (
    <MainSection>
      {club && (
        <Flex gap={6} h="full" direction={['column', null, 'row']}>
          <Flex direction="column" w={{ md: '20%' }} gap={4}>
            <ClubDetailInformation club={club} isCurrUserAdmin={isCurrUserAdmin} />
            {isCurrUserAdmin && <ClubDetailSeasons clubId={club.id} />}
            <RequestsComp></RequestsComp>
          </Flex>

          <Tabs display={{ md: 'none' }} isFitted>
            <TabList>
              <Tab>Players</Tab>
              <Tab>Matches</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <StatisticsFilter
                  club={club}
                  setRoleFilter={setRoleFilter}
                  setSeasonFilter={setSeasonFilter}
                />
                <Statistics statistics={statistics} cumulative={true} role={roleFilter} />
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
            <Flex px={5} gap={4} alignItems={{ md: 'center' }}>
              <Text
                fontWeight="bold"
                color="brand.title"
                fontSize="xl"
                display={{ base: 'none', md: 'flex' }}
              >
                Statistics
              </Text>
              <Spacer />
              <StatisticsFilter
                club={club}
                setRoleFilter={setRoleFilter}
                setSeasonFilter={setSeasonFilter}
              />
            </Flex>
            <Statistics statistics={statistics} cumulative={true} role={roleFilter}></Statistics>
          </Flex>
          <Flex
            direction="column"
            borderRadius="base"
            w={{ md: '31%' }}
            h="full"
            gap={4}
            display={{ base: 'none', md: 'flex' }}
          >
            {matches && <MatchesComp matches={matches}></MatchesComp>}
          </Flex>
        </Flex>
      )}
    </MainSection>
  );
}
