import {
  Stack,
  Table,
  TableContainer,
  Td,
  Text,
  Tr,
  Tbody,
  Thead,
  Th,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Spacer,
  Icon,
  Button,
  Flex,
} from '@chakra-ui/react';

import { BsFilter } from 'react-icons/bs';

const stats = [
  {
    name: 'Player Name',
    team: 'Home',
    goals: 0,
    asisst: 1,
    penalty: 2,
  },
  {
    name: 'Player Name',
    team: 'Away',
    goals: 1,
    asisst: 1,
    penalty: 0,
  },
  {
    name: 'Player Name',
    team: 'Home',
    goals: 1,
    asisst: 2,
    penalty: 2,
  },
  {
    name: 'Player Name',
    team: 'Home',
    goals: 1,
    asisst: 0,
    penalty: 5,
  },
];

const teams = [...new Set(stats.map((team) => team.team))];

export const MatchStatistics = ({ data }) => {
  return (
    <>
      <TableContainer
        py={[2, 4, 6]}
        px={[2, 10, 14]}
        mt={1}
        h={'full'}
        borderRadius={'base'}
        flexGrow={1}
        minHeight={0}
        bg={'brand.boxBackground'}
      >
        <Popover>
          <PopoverTrigger>
            <Button
              maxW={{ md: 52 }}
              variant="light"
              as={Flex}
              alignItems="center"
              mb={2}
              cursor="pointer"
              gap={2}
            >
              <Text textTransform="capitalize">All teams</Text>
              <Spacer />
              <Icon as={BsFilter} boxSize={6} />
            </Button>
          </PopoverTrigger>
          <PopoverContent maxW={{ md: 52 }} bg="#3E4A66" border={0}>
            <PopoverBody as={Flex} gap={2} direction="column">
              {teams.map((team, i) => (
                <Button key={i} variant="popup" size="sm">
                  {team}
                </Button>
              ))}
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Table size={{ base: 'sm' }} variant={['base', 'lg', null]}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Team</Th>
              <Th>TP</Th>
              <Th>Penalty</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stats.map((player, i) => (
              <Tr key={i}>
                <Td textColor="white">{i + 1}.</Td>
                <Td textColor="white">{player.name}</Td>
                <Td textColor="white">{player.team}</Td>
                <Td textColor="white" fontWeight="bold">
                  <Stack direction="row" justifyContent="center">
                    <Text>{player.goals + player.asisst}</Text>
                    <Text fontWeight={400}>{'(' + player.goals + ' + ' + player.asisst + ')'}</Text>
                  </Stack>
                </Td>
                <Td textColor="white">{player.penalty + ' min'}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
