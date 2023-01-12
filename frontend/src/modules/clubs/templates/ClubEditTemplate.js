import AppHeader from 'src/shared/core/organisms/AppHeader';
import {
  Box,
  Container,
  Flex,
  Icon,
  Spinner,
  Heading,
  Spacer,
  Button,
  Text,
  Tabs,
  TabPanels,
  TabPanel,
  Tab,
  TabList,
  Stack,
} from '@chakra-ui/react';
import { RouterLink } from 'src/shared/navigation';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { route } from 'src/Routes';
import { ClubEditForm } from 'src/modules/clubs/organisms/ClubEditForm';
import { AddPlayerForm } from '../organisms/AddPlayerForm';
import { PlayersList } from '../organisms/PlayersList';
import { ModalDeleteClub } from '../molecules/ModalDeleteClub';
import { BsPlusCircle } from 'react-icons/bs';
import { useState } from 'react';
import { FormField, Form } from 'src/shared/hook-form';
import { AddTemporaryPlayerForm } from 'src/modules/clubs/organisms/AddTemporaryPlayerForm';

export default function ClubEditTemplate(
  {
    clubRQ,
    clubDeleteRQ,
    invitePlayerRQ,
    editClubRQ,
    removePlayerRQ,
    makePlayerAdminRQ,
    addTemporaryPlayerRQ,
    districts,
    isCurrUserAdmin,
  },
  { ...props },
) {
  // console.log('clubRQ.club.id: ' + clubRQ?.club?.id);

  // const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);

  const [addTemporaryPlayer, setAddTemporaryPlayer] = useState(false);

  const players = (clubRQ.club?.players ?? []).reduce(
    (acc, player) => {
      if (!!player.userName) {
        acc.invited.push(player);
      } else {
        acc.temporary.push(player);
      }

      return acc;
    },
    {
      invited: [],
      temporary: [],
    },
  );
  return (
    <Flex direction="column" h={{ md: '100vh' }}>
      <AppHeader title="Club detail" />
      <Container maxW="container.xl" h="full" minHeight={0} my={5}>
        {!clubRQ.club && clubRQ.loading && (
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
                    isCurrUserAdmin={isCurrUserAdmin}
                  />
                </Box>
                <Spacer />

                {isCurrUserAdmin && (
                  <ModalDeleteClub
                    isOpen={clubDeleteRQ?.isOpen}
                    onOpen={clubDeleteRQ?.onOpen}
                    handleDeleteClub={clubDeleteRQ?.handleDeleteClub}
                    onClose={clubDeleteRQ?.onClose}
                  />
                )}
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

              <Tabs isFitted>
                <TabList>
                  <Tab _selected={{ color: 'brand.primary', borderColor: 'brand.primary' }}>
                    Invited players
                  </Tab>
                  <Tab _selected={{ color: 'brand.primary', borderColor: 'brand.primary' }}>
                    Temporary players
                  </Tab>
                </TabList>
                <TabPanels h={'full'}>
                  <TabPanel px={0} h={'full'}>
                    {isCurrUserAdmin && (
                      <AddPlayerForm
                        isLoading={invitePlayerRQ.loading}
                        onSubmit={invitePlayerRQ.onSubmit}
                        error={invitePlayerRQ.error}
                        isCompleted={invitePlayerRQ.isCompleted}
                        setIsCompleted={invitePlayerRQ.setIsCompleted}
                        emailFromInvitation={invitePlayerRQ.emailFromInvitation}
                      />
                    )}
                    <PlayersList
                      clubId={clubRQ.club?.id}
                      players={players.invited}
                      removePlayerRQ={removePlayerRQ}
                      makePlayerAdminRQ={makePlayerAdminRQ}
                    />
                  </TabPanel>
                  <TabPanel px={0} h={'full'}>
                    {isCurrUserAdmin && (
                      <AddTemporaryPlayerForm
                        isLoading={addTemporaryPlayerRQ.loading}
                        onSubmit={addTemporaryPlayerRQ.onSubmit}
                      />
                    )}
                    <PlayersList
                      clubId={clubRQ.club?.id}
                      players={players.temporary}
                      removePlayerRQ={removePlayerRQ}
                      isCurrUserAdmin={isCurrUserAdmin}
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Flex>
          </Flex>
        )}
      </Container>
    </Flex>
  );
}
