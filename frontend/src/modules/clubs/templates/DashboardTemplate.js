import AppHeader from 'src/shared/core/organisms/AppHeader';
import { Box, Container, Flex, Heading, Spinner } from '@chakra-ui/react';
import { MyClubsPanel } from '../organisms/MyClubsPanel';

export default function DashboardTemplate({ clubs, loading }) {
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
              display={{ base: 'none', md: 'flex' }}
            >
              <Heading size={'lg'}>Clubs nearby</Heading>
              <Flex align="center" justify="center" h="full">
                <Box>There is going to be a map with clubs' locations :)</Box>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Container>
    </Flex>
  );
}
