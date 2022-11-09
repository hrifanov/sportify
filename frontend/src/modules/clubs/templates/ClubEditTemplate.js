import AppHeader from 'src/shared/core/organisms/AppHeader';
import { Box, Container, Flex, Icon, Spinner, Stack } from '@chakra-ui/react';
import { RouterLink } from 'src/shared/navigation';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { route } from 'src/Routes';
import { ClubEditForm } from 'src/modules/clubs/organisms/ClubEditForm';
import { AddPlayerForm } from '../organisms/AddPlayerForm';
import { PlayersList } from '../organisms/PlayersList';

export default function ClubEditTemplate({ club, loading, onSubmit }) {
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
            <Flex direction="column" w={{ md: 5 / 12 }} gap={4}>
              <Box
                w="full"
                h="full"
                bg="brand.boxBackground"
                borderRadius="base"
                pt={4}
                pb={6}
                px={5}
              >
                <Flex
                  as={RouterLink}
                  mt={5}
                  to={route.clubDetail()}
                  color="brand.secondary"
                  alignItems="center"
                  gap={2}
                >
                  <Icon as={FiArrowLeftCircle} />
                  Back to team detail
                </Flex>
                <Box mt={6}>
                  <ClubEditForm onSubmit={onSubmit} />
                </Box>
              </Box>
            </Flex>

            <Flex
              direction="column"
              w="full"
              minW={0}
              h="full"
              bg="brand.boxBackground"
              borderRadius="base"
              py={4}
              px={4}
            >
              <Stack w={350}>
                <AddPlayerForm onSubmit={onSubmit} />
              </Stack>
              <PlayersList />
            </Flex>
          </Flex>
        )}
      </Container>
    </Flex>
  );
}
