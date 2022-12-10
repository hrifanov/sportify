import AppHeader from 'src/shared/core/organisms/AppHeader';
import {
  Box,
  Container,
  Flex,
  Heading,
  Grid,
  Spinner,
  Stack,
  Select,
  Input,
  Button,
} from '@chakra-ui/react';
import { MyClubsPanel } from '../organisms/MyClubsPanel';
import AllClubs from '../organisms/AllClubs';
import { GiBrandyBottle } from 'react-icons/gi';
import { parseAndCheckHttpResponse } from '@apollo/client';
import { Country, State, City } from 'country-state-city';
import { useEffect, useState } from 'react';
import { JoinClubsFilter } from '../molecules/JoinClubsFilter';

export default function DashboardTemplate({ clubs, allClubs, loading, user }) {
  const [sportFilter, setSportFilter] = useState(null);
  const [localityFilter, setLocalityFilter] = useState(null);
  const [nameFilter, setNameFilter] = useState(null);
  return (
    <Flex direction="column" h={{ md: '100vh' }}>
      <AppHeader title="Dashboard" />
      <Container maxW="container.xl" h="full" minHeight={0} my={5}>
        {loading && (
          <Flex h="full" bg="brand.boxBackground" alignItems="center" justifyContent="center">
            <Spinner />
          </Flex>
        )}
        {clubs && (
          <Flex gap={6} h="full" direction={['column', null, 'row']}>
            <Flex direction="column" w={{ md: '30%' }} gap={4}>
              <Box
                w="full"
                h="full"
                bg="brand.boxBackground"
                borderRadius="base"
                pt={4}
                pb={6}
                px={5}
                overflowY={'auto'}
              >
                <MyClubsPanel clubs={clubs} />
              </Box>
            </Flex>
            <Flex
              direction="column"
              w={{ md: '70%' }}
              minW={0}
              h="full"
              bg="brand.boxBackground"
              borderRadius="base"
              py={4}
              px={4}
              display="flex"
            >
              <Heading size={'lg'} mb={4}>
                Find your new club
              </Heading>
              <JoinClubsFilter
                clubs={clubs}
                setLocalityFilter={setLocalityFilter}
                setSportFilter={setSportFilter}
                setNameFilter={setNameFilter}
              />
              <Grid
                templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
                gap={['0', '4', '4']}
              >
                {(() => {
                  if (sportFilter && nameFilter && localityFilter) {
                    const filteredClubs = clubs.filter(
                      (club) =>
                        club.sport.includes(sportFilter) &&
                        club.locality.includes(localityFilter) &&
                        club.name.toLowerCase().includes(nameFilter.toLowerCase()),
                    );
                    return <AllClubs clubs={filteredClubs} />;
                  } else if (nameFilter && sportFilter) {
                    const filteredClubs = clubs.filter(
                      (club) =>
                        club.sport.includes(sportFilter) &&
                        club.name.toLowerCase().includes(nameFilter.toLowerCase()),
                    );
                    return <AllClubs clubs={filteredClubs} />;
                  } else if (localityFilter && nameFilter) {
                    const filteredClubs = clubs.filter(
                      (club) =>
                        club.locality.includes(localityFilter) &&
                        club.name.toLowerCase().includes(nameFilter.toLowerCase()),
                    );
                    return <AllClubs clubs={filteredClubs} />;
                  } else if (sportFilter && localityFilter) {
                    const filteredClubs = clubs.filter(
                      (club) =>
                        club.sport.includes(sportFilter) && club.locality.includes(localityFilter),
                    );
                    return <AllClubs clubs={filteredClubs} />;
                  } else if (sportFilter) {
                    const filteredClubs = clubs.filter((club) => club.sport.includes(sportFilter));
                    return <AllClubs clubs={filteredClubs} />;
                  } else if (nameFilter) {
                    const filteredClubs = clubs.filter((club) =>
                      club.name.toLowerCase().includes(nameFilter.toLowerCase()),
                    );
                    return <AllClubs clubs={filteredClubs} />;
                  } else if (localityFilter) {
                    const filteredClubs = clubs.filter((club) =>
                      club.name.toLowerCase().includes(localityFilter.toLowerCase()),
                    );
                    return <AllClubs clubs={filteredClubs} />;
                  } else {
                    return <AllClubs clubs={clubs} user={user} />;
                  }
                })()}
              </Grid>
            </Flex>
          </Flex>
        )}
      </Container>
    </Flex>
  );
}
