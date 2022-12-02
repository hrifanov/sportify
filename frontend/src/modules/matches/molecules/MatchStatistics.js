import { Stack, Table, TableContainer, Td, Text, Tr, Tbody, Thead, Th } from '@chakra-ui/react';

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
        <Table size={{ base: 'sm' }} variant="base" fontSize={[5, 14, 14]}>
          <Thead>
            <Tr>
              <Th textAlign="left">ID</Th>
              <Th textAlign="left">Name</Th>
              <Th textAlign="left">Team</Th>
              <Th textAlign="left">TP</Th>
              <Th textAlign="left">Penalty</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stats.map((player, i) => (
              <Tr key={i}>
                <Td textAlign="left" textColor="white">
                  {i + 1}.
                </Td>
                <Td textAlign="left" textColor="white">
                  {player.name}
                </Td>
                <Td textAlign="left" textColor="white">
                  {player.team}
                </Td>
                <Td textColor="white" fontWeight="bold">
                  <Stack direction="row">
                    <Text>{player.goals + player.asisst}</Text>
                    <Text fontWeight={400}>{'(' + player.goals + ' + ' + player.asisst + ')'}</Text>
                  </Stack>
                </Td>
                <Td textAlign="left" textColor="white">
                  {player.penalty + ' min'}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
