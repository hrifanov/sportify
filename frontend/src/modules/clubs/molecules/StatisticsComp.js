import {
  Flex,
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
} from '@chakra-ui/react';

import { BsFilter } from 'react-icons/bs';
import {
  RoleAttackerIcon,
  RoleDefenderIcon,
  RoleGoalKeeperIcon,
} from 'src/shared/design-system/icons';
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

export default function StatisticsComp({ players }) {
  return (
    <>
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
        <Table size={{ base: 'sm' }} variant="base" className="statistics-table">
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
          {console.log(players)}
          <Tbody color="brand.secondary">
            {players.map((player, i) => (
              <Tr key={i}>
                <Td textAlign="left" textColor="white">
                  {i + 1}.
                </Td>
                <Td textColor="white">
                  <RoleIcon role={'attacker'} />
                </Td>
                <Td textAlign="left" textColor="white">
                  {player.name}
                </Td>
                <Td textColor="white" fontWeight="bold">
                  TP
                </Td>
                <Td>matches</Td>
                <Td>avarage</Td>
                <Td>goals</Td>
                <Td>assist</Td>
                <Td>penalty</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
