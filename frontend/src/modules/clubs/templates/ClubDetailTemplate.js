import {
  Flex,
  Text,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
  Spacer,
  Icon,
} from '@chakra-ui/react';
import Statistics from 'src/modules/matches/molecules/Statistics';
import MatchesComp from '../molecules/MatchesComp';
import RequestsComp from '../molecules/RequestsComp';
import { ClubDetailInformation } from '../organisms/ClubDetailInformation';
import { ClubDetailSeasons } from '../organisms/ClubDetailSeasons';
import { MainSection } from 'src/shared/core/atoms/MainSection';
import { FullPageSpinner } from 'src/shared/design-system/atoms/FullPageSpinner';
import { RoleEnum } from 'src/modules/matches/enums';
import { useEffect, useState } from 'react';
import { find } from 'lodash';
import { StatisticsFilter } from 'src/modules/clubs/molecules/StatisticsFilter';
import { RouterLink } from 'src/shared/navigation';
import { route } from 'src/Routes';
import { FiSettings } from 'react-icons/fi';

export default function ClubDetailTemplate({
  club,
  clubLocalityLabel,
  applications,
  handleApplication,
  loading,
  matches,
  players,
  isCurrUserAdmin,
}) {
  const [roleFilter, setRoleFilter] = useState(RoleEnum.ALL);
  const [seasonFilter, setSeasonFilter] = useState(null);

  useEffect(() => {
    setSeasonFilter(club?.seasons?.[0]?.id);
  }, [club]);

  if (loading) {
    return <FullPageSpinner />;
  }

  const statistics = find(club?.seasons, { id: seasonFilter })?.statistics;

  return (
    <MainSection>
      {club && (
        <Flex px={0} gap={6} h="full" direction={['column', null, 'row']}>
          <Flex direction="column" w={{ md: '20%' }} minW="250px" gap={4}>
            <ClubDetailInformation
              club={club}
              clubLocalityLabel={clubLocalityLabel}
              isCurrUserAdmin={isCurrUserAdmin}
            />
            {/* {isCurrUserAdmin && <ClubDetailSeasons clubId={club?.id} />} */}
            {isCurrUserAdmin && applications && applications[0] && (
              <RequestsComp
                applications={applications}
                handleApplication={handleApplication}
              ></RequestsComp>
            )}
          </Flex>

          <Tabs display={{ md: 'none' }} isFitted>
            <TabList>
              <Tab>Players</Tab>
              <Tab>Matches</Tab>
            </TabList>
            <TabPanels>
              <TabPanel px={0}>
                <StatisticsFilter
                  club={club}
                  setRoleFilter={setRoleFilter}
                  setSeasonFilter={setSeasonFilter}
                />
                <Statistics statistics={statistics} cumulative={true} role={roleFilter} />
              </TabPanel>
              <TabPanel px={0}>{matches && <MatchesComp matches={matches}></MatchesComp>}</TabPanel>
            </TabPanels>
          </Tabs>
          <Flex
            direction="column"
            w={{ md: '49%' }}
            minW={['440px']}
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
            px={0}
            display={{ base: 'none', md: 'flex' }}
          >
            {matches && <MatchesComp matches={matches}></MatchesComp>}
          </Flex>
        </Flex>
      )}
    </MainSection>
  );
}
