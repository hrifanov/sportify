import AppHeader from 'src/shared/core/organisms/AppHeader';
import { Box, Container, Flex, Heading, Grid, Spinner } from '@chakra-ui/react';
import { MyClubsPanel } from '../organisms/MyClubsPanel';
import AllClubs from '../organisms/AllClubs';
import { useState } from 'react';
import { JoinClubsFilter } from '../molecules/JoinClubsFilter';
import ReactPaginate from 'react-paginate';

export default function DashboardTemplate({ clubs, allClubs, loading, user }) {
  const [sportFilter, setSportFilter] = useState(null);
  const [localityFilter, setLocalityFilter] = useState(null);
  const [nameFilter, setNameFilter] = useState(null);
  const itemsPerPage = 1;

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const clubsForPagination = allClubs?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(allClubs?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allClubs?.length;
    setItemOffset(newOffset);
  };
  return (
    <Flex direction="column" h={{ md: '100vh' }}>
      <AppHeader title="Dashboard" />
      <Container maxW="container.xl" h="full" minHeight={0} my={5}>
        {loading && (
          <Flex h="full" bg="brand.boxBackground" alignItems="center" justifyContent="center">
            <Spinner />
          </Flex>
        )}
        {allClubs && clubs && (
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
                clubs={allClubs}
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
                    const filteredClubs = allClubs.filter(
                      (club) =>
                        club.sport.includes(sportFilter) &&
                        club.locality.includes(localityFilter) &&
                        club.name.toLowerCase().includes(nameFilter.toLowerCase()),
                    );
                    const filteredPagination = filteredClubs.slice(itemOffset, endOffset);
                    return (
                      <AllClubs
                        itemsPerPage={itemsPerPage}
                        allClubs={filteredPagination}
                        user={user}
                      />
                    );
                  } else if (nameFilter && sportFilter) {
                    const filteredClubs = allClubs.filter(
                      (club) =>
                        club.sport.includes(sportFilter) &&
                        club.name.toLowerCase().includes(nameFilter.toLowerCase()),
                    );
                    const filteredPagination = filteredClubs.slice(itemOffset, endOffset);
                    return (
                      <AllClubs
                        itemsPerPage={itemsPerPage}
                        allClubs={filteredPagination}
                        user={user}
                      />
                    );
                  } else if (localityFilter && nameFilter) {
                    const filteredClubs = allClubs.filter(
                      (club) =>
                        club.locality.includes(localityFilter) &&
                        club.name.toLowerCase().includes(nameFilter.toLowerCase()),
                    );
                    const filteredPagination = filteredClubs.slice(itemOffset, endOffset);
                    return (
                      <AllClubs
                        itemsPerPage={itemsPerPage}
                        allClubs={filteredPagination}
                        user={user}
                      />
                    );
                  } else if (sportFilter && localityFilter) {
                    const filteredClubs = allClubs.filter(
                      (club) =>
                        club.sport.includes(sportFilter) && club.locality.includes(localityFilter),
                    );
                    const filteredPagination = filteredClubs.slice(itemOffset, endOffset);
                    return (
                      <AllClubs
                        itemsPerPage={itemsPerPage}
                        allClubs={filteredPagination}
                        user={user}
                      />
                    );
                  } else if (sportFilter) {
                    const filteredClubs = allClubs.filter((club) =>
                      club.sport.includes(sportFilter),
                    );
                    const filteredPagination = filteredClubs.slice(itemOffset, endOffset);
                    return (
                      <AllClubs
                        itemsPerPage={itemsPerPage}
                        allClubs={filteredPagination}
                        user={user}
                      />
                    );
                  } else if (nameFilter) {
                    const filteredClubs = allClubs.filter((club) =>
                      club.name.toLowerCase().includes(nameFilter.toLowerCase()),
                    );
                    const filteredPagination = filteredClubs.slice(itemOffset, endOffset);
                    return (
                      <AllClubs
                        itemsPerPage={itemsPerPage}
                        allClubs={filteredPagination}
                        user={user}
                      />
                    );
                  } else if (localityFilter) {
                    const filteredClubs = allClubs.filter((club) =>
                      club.locality.toLowerCase().includes(localityFilter.toLowerCase()),
                    );
                    console.log(filteredClubs);
                    const filteredPagination = filteredClubs.slice(itemOffset, endOffset);
                    console.log(filteredPagination);
                    return (
                      <AllClubs
                        itemsPerPage={itemsPerPage}
                        allClubs={filteredPagination}
                        user={user}
                      />
                    );
                  } else {
                    return (
                      <AllClubs
                        itemsPerPage={itemsPerPage}
                        allClubs={clubsForPagination}
                        user={user}
                      />
                    );
                  }
                })()}
              </Grid>
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </Flex>
          </Flex>
        )}
      </Container>
    </Flex>
  );
}
