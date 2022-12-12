import AppHeader from 'src/shared/core/organisms/AppHeader';
import { Box, Container, Flex, Icon, Spacer, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { Button } from 'src/shared/design-system';

import { RouterLink } from 'src/shared/navigation';
import { route } from 'src/Routes';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { ModalCreateSeason } from '../organisms/ModalCreateSeason';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsPlusCircle } from 'react-icons/bs';

export default function ManageSeasonsTemplate({
  isCurrUserAdmin,
  club,
  onSubmit,
  loading,
  error,
  createSeasonRQ,
  modalNewSeason,
  handleDeleteSeason,
}) {
  return (
    <Flex direction="column" h={{ md: '100vh' }}>
      <AppHeader title="Seasons" />
      {loading && <p>Loading</p>}

      <Container maxW="container.xl" h="full" minHeight={0} my={5}>
        <Flex gap={6} h="full" direction={'column'} align="center">
          <Flex direction="column" w={['100%', '', '', '80%']} gap={4}>
            <Box
              w="full"
              h="full"
              bg="brand.boxBackground"
              borderRadius="base"
              pt={4}
              pb={6}
              px={8}
            >
              <Flex
                as={RouterLink}
                mt={1}
                mb={3}
                to={route.clubDetail(club?.id)}
                color="brand.secondary"
                alignItems="center"
                gap={2}
              >
                <Icon as={FiArrowLeftCircle} />
                Back
              </Flex>
              <Flex direction="column">
                <Wrap>
                  {club?.seasons?.map((season) => {
                    return (
                      <WrapItem p={3} border="1px" borderRadius={8} minW="200px">
                        <Flex align="center" w={'100%'}>
                          <Text>{season.name}</Text>
                          <Spacer />
                          <Button
                            onClick={() => handleDeleteSeason(season.id)}
                            ml={6}
                            w="10%"
                            p={0}
                            variant="primary"
                          >
                            <AiOutlineDelete size={30}></AiOutlineDelete>
                          </Button>
                        </Flex>
                      </WrapItem>
                    );
                  })}
                  {/* <ModalDeleteSeasonConfirm /> */}
                  <WrapItem p={3} border="1px" borderRadius={8} minW="200px">
                    <Flex align="center" justify="center" w={'100%'} h={'100%'}>
                      <Box>New Season</Box>
                      <Spacer />
                      <Button
                        onClick={modalNewSeason.onOpen}
                        ml={6}
                        w="10%"
                        p={0}
                        variant="secondary"
                      >
                        <Box>
                          <BsPlusCircle size={30}></BsPlusCircle>
                        </Box>
                      </Button>
                    </Flex>
                  </WrapItem>
                  <ModalCreateSeason
                    createSeasonRQ={createSeasonRQ}
                    isOpen={modalNewSeason?.isOpen}
                    onOpen={modalNewSeason?.onOpen}
                    onClose={modalNewSeason?.onClose}
                  />
                </Wrap>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}
