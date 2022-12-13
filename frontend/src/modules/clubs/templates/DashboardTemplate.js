import AppHeader from 'src/shared/core/organisms/AppHeader';
import { Box, Container, Flex, Heading, Grid, Spinner } from '@chakra-ui/react';
import { MyClubsPanel } from '../organisms/MyClubsPanel';
import AllClubs from '../organisms/AllClubs';
import { useState } from 'react';
import { JoinClubsFilter } from '../molecules/JoinClubsFilter';
import ReactPaginate from 'react-paginate';

export default function DashboardTemplate({ clubs, allClubs, loading, user }) {
  const [filters, setFilters] = useState(null);
  const itemsPerPage = 12;

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const pageCount = Math.ceil(allClubs?.length / itemsPerPage);

  const filteredClubs = (allClubs ?? []).filter((club) => {
    if (filters?.name && !club.name.toLowerCase().includes(filters.name.toLowerCase()))
      return false;
    if (filters?.sport?.key && club.sport !== filters.sport.key) return false;
    if (filters?.locality?.key && club.locality !== filters.locality.key) return false;
    return true;
  });
  const paginatedClubs = filteredClubs.slice(itemOffset, endOffset);

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
              <JoinClubsFilter clubs={allClubs} setFilters={setFilters} />
              <Grid
                templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
                gap={['0', '4', '4']}
              >
                <AllClubs allClubs={paginatedClubs} user={user} />
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
