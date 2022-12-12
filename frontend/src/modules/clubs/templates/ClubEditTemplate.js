import AppHeader from 'src/shared/core/organisms/AppHeader';
import { Box, Container, Flex, Icon, Spinner, Heading, Spacer } from '@chakra-ui/react';
import { RouterLink } from 'src/shared/navigation';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { route } from 'src/Routes';
import { ClubEditForm } from 'src/modules/clubs/organisms/ClubEditForm';
import { AddPlayerForm } from '../organisms/AddPlayerForm';
import { PlayersList } from '../organisms/PlayersList';
import { ModalDeleteClub } from '../molecules/ModalDeleteClub';

export default function ClubEditTemplate(
  {
    clubRQ,
    clubDeleteRQ,
    invitePlayerRQ,
    editClubRQ,
    removePlayerRQ,
    makePlayerAdminRQ,
    districts,
  },
  { ...props },
) {
  // console.log('clubRQ.club.id: ' + clubRQ?.club?.id);

  // const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);

  return (
    <Flex direction="column" h={{ md: '100vh' }}>
      <AppHeader title="Club detail" />
      <Container maxW="container.xl" h="full" minHeight={0} my={5}>
        {clubRQ.loading && (
          <Flex h="full" bg="brand.boxBackground" alignItems="center" justifyContent="center">
            <Spinner />
          </Flex>
        )}
        {clubRQ.club && (
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
                  to={route.clubDetail(clubRQ.club.id)}
                  color="brand.secondary"
                  alignItems="center"
                  gap={2}
                >
                  <Icon as={FiArrowLeftCircle} />
                  Back to team detail
                </Flex>
                <Box mt={6}>
                  <ClubEditForm
                    club={clubRQ.club}
                    loading={editClubRQ.loading}
                    onSubmit={editClubRQ.onSubmit}
                    error={editClubRQ.error}
                    isCompleted={editClubRQ.isCompleted}
                    setIsCompleted={editClubRQ.setIsCompleted}
                    districts={districts}
                  />
                </Box>
                <Spacer />

                <ModalDeleteClub
                  isOpen={clubDeleteRQ?.isOpen}
                  onOpen={clubDeleteRQ?.onOpen}
                  handleDeleteClub={clubDeleteRQ?.handleDeleteClub}
                  onClose={clubDeleteRQ?.onClose}
                />
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
              <Flex align="center" justify="center">
                <Heading as="h3">Players</Heading>
              </Flex>

              <AddPlayerForm
                isLoading={invitePlayerRQ.loading}
                onSubmit={invitePlayerRQ.onSubmit}
                error={invitePlayerRQ.error}
                isCompleted={invitePlayerRQ.isCompleted}
                setIsCompleted={invitePlayerRQ.setIsCompleted}
                emailFromInvitation={invitePlayerRQ.emailFromInvitation}
              />
              <PlayersList
                club={clubRQ.club}
                removePlayerRQ={removePlayerRQ}
                makePlayerAdminRQ={makePlayerAdminRQ}
              />
            </Flex>
          </Flex>
        )}
      </Container>
    </Flex>
  );
}
