import { Table, TableContainer, Td, Text, Tr, Tbody, Spacer, Button, Box } from '@chakra-ui/react';
import _ from 'lodash';
import { matches } from 'src/modules/clubs/matches.js';
import { FiPlayCircle } from 'react-icons/fi';
import { route } from '../../../Routes.js';
import { useNavigate } from 'react-router-dom';

const groupedMatches = _.groupBy(matches, 'date');

export default function StatisticsComp() {
  const navigate = useNavigate();

  return (
    <>
      <Box h="full" borderRadius="base" pt={4} pb={6} px={5}>
        <Text fontWeight="bold" color="brand.title" fontSize="xl">
          Matches
        </Text>
        <Spacer />
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
          <Table size={{ base: 'sm' }} variant="base">
            <Tbody>
              {Object.keys(groupedMatches).map((date) => (
                <>
                  <Tr key={date}>
                    <Td></Td>
                    <Td textAlign="center" color="brand.secondary">
                      {date}
                    </Td>
                    <Td></Td>
                  </Tr>
                  {groupedMatches[date].map((match) => (
                    <Tr>
                      <Td textAlign="left">{match.teams.home.name}</Td>
                      <Td textAlign="center" fontWeight="bold">
                        {match.score.home}: {match.score.away}
                      </Td>
                      <Td textAlign="right">{match.teams.away.name}</Td>
                    </Tr>
                  ))}
                </>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Button
        padding={7}
        colorScheme="orange"
        w="full"
        onClick={() => navigate(route.createMatch())}
      >
        <Text>Start a new match </Text>
        <FiPlayCircle style={{ position: 'absolute', right: '2%' }} size={40} />
      </Button>
    </>
  );
}
