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
  Thead,
  Th,
  Spacer,
  Button,
  Popover,
  PopoverTrigger,
  PopoverBody,
  PopoverContent,
  Spinner,
  Show,
} from '@chakra-ui/react';
import { RouterLink } from 'src/shared/navigation';
import { FiSettings } from 'react-icons/fi';
import { players } from 'src/modules/clubs/players';
import {
  RoleAttackerIcon,
  RoleDefenderIcon,
  RoleGoalKeeperIcon,
} from 'src/shared/design-system/icons';
import { BsFilter } from 'react-icons/bs';

export default function ClubDetailTemplate({ club, loading }) {
  const RoleIcon = ({ role }) => {
    const getProps = ({ width }) => ({
      width,
      style: { margin: 'auto', color: '#9FB2D1' },
    });
    const Element = {
      attacker: () => <RoleAttackerIcon {...getProps({ width: 15 })} />,
      defender: () => <RoleDefenderIcon {...getProps({ width: 20 })} />,
      goalkeeper: () => <RoleGoalKeeperIcon {...getProps({ width: 25 })} />,
    }[role];

    return <Element />;
  };

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
              <Box w="full" bg="brand.boxBackground" borderRadius="base" pt={4} pb={6} px={5}>
                <Text fontWeight="bold" color="brand.title" fontSize="xl">
                  Information
                </Text>
                <Flex alignItems="center" gap={4} mt={2}>
                  <Image src={require('src/assets/club.png')} w="100px" h="100px" />
                  <Box>
                    <Text textTransform="uppercase" fontWeight="bold">
                      {club.name}
                    </Text>
                    <Text color="brand.secondary">{club.sport}</Text>
                  </Box>
                </Flex>
                <TableContainer mt={4}>
                  <Table variant="unstyled">
                    <Tbody>
                      <Tr>
                        <Td py={1} pl={0} pr={3} fontWeight="bold">
                          Locality:
                        </Td>
                        <Td w="full" py={1} px={0}>
                          {club.locality}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td py={1} pl={0} pr={3} fontWeight="bold">
                          Leader:
                        </Td>
                        <Td w="full" py={1} px={0}>
                          John Doe
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
                <RouterLink
                  as={Flex}
                  mt={5}
                  to="#"
                  color="brand.secondary"
                  alignItems="center"
                  gap={2}
                >
                  <Icon as={FiSettings} />
                  Manage team
                </RouterLink>
              </Box>
              <Show above="md">
                <Box w="full" h="full" bg="brand.boxBackground" borderRadius="base" py={4} px={5}>
                  <Text fontWeight="bold" color="brand.title" fontSize="xl">
                    Join requests
                  </Text>
                </Box>
              </Show>
            </Flex>

            <Flex
              direction="column"
              w="full"
              minW={0}
              h="full"
              bg="brand.boxBackground"
              borderRadius="base"
              py={4}
            >
              <Flex
                px={5}
                gap={[2, null, 5]}
                alignItems={{ md: 'center' }}
                direction={['column', null, 'row']}
              >
                <Text fontWeight="bold" color="brand.title" fontSize="xl">
                  Statistics
                </Text>

                <Spacer />

                <Popover>
                  <PopoverTrigger>
                    <Button
                      variant="light"
                      as={Flex}
                      alignItems="center"
                      w="full"
                      maxW={{ md: 40 }}
                      m={0}
                      cursor="pointer"
                      gap={2}
                    >
                      <Text textTransform="capitalize">All players</Text>
                      <Spacer />
                      <Icon as={BsFilter} boxSize={6} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent maxW={{ md: 40 }} bg="#3E4A66" border={0}>
                    <PopoverBody as={Flex} gap={2} direction="column">
                      <Button variant="popup" size="sm">
                        All players
                      </Button>
                      <Button variant="popup" size="sm">
                        Outfield
                      </Button>
                      <Button variant="popup" size="sm">
                        Goalkeepers
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger>
                    <Button
                      maxW={{ md: 52 }}
                      variant="light"
                      as={Flex}
                      alignItems="center"
                      m={0}
                      cursor="pointer"
                      gap={2}
                    >
                      <Text textTransform="capitalize">Season 01/21 - 12/21</Text>
                      <Spacer />
                      <Icon as={BsFilter} boxSize={6} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent maxW={{ md: 52 }} bg="#3E4A66" border={0}>
                    <PopoverBody as={Flex} gap={2} direction="column">
                      <Button variant="popup" size="sm">
                        All time
                      </Button>
                      <Button variant="popup" size="sm">
                        Season 01/22 - 12/22
                      </Button>
                      <Button variant="popup" size="sm">
                        Season 01/21 - 12/21
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Flex>
              <TableContainer
                mt={2}
                px={2}
                overflowY="scroll"
                style={{
                  td: {
                    textAlign: 'center',
                  },
                }}
              >
                <Table size={['sm', null, 'md']} variant="base" className="statistics-table">
                  <Thead>
                    <Tr>
                      <Th textAlign="left">ID</Th>
                      <Th>Role</Th>
                      <Th textAlign="left">Name</Th>
                      <Th fontWeight="bold">TP</Th>
                      <Th>M</Th>
                      <Th>Avg</Th>
                      <Th>G</Th>
                      <Th>A</Th>
                      <Th>P</Th>
                    </Tr>
                  </Thead>
                  <Tbody color="brand.secondary">
                    {[...players, ...players].map((player, i) => (
                      <Tr key={i}>
                        <Td textAlign="left" textColor="white">
                          {i + 1}.
                        </Td>
                        <Td textColor="white">
                          <RoleIcon role={player.role} />
                        </Td>
                        <Td textAlign="left" textColor="white">
                          {player.name}
                        </Td>
                        <Td textColor="white" fontWeight="bold">
                          {player.totalPoints}
                        </Td>
                        <Td>{player.matches}</Td>
                        <Td>{player.average}</Td>
                        <Td>{player.goals}</Td>
                        <Td>{player.assist}</Td>
                        <Td>{player.penalty}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </Flex>
        )}
      </Container>
    </Flex>
  );
}
