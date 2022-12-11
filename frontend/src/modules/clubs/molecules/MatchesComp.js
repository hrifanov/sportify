import { Table, TableContainer, Td, Text, Tr, Tbody, Spacer, Button, Box } from '@chakra-ui/react';
import _, { orderBy } from 'lodash';
import { FiPlayCircle } from 'react-icons/fi';
import { route } from '../../../Routes.js';
import { useNavigate } from 'react-router-dom';
import { formatDate } from 'src/utils/date';
export default function MatchesComp({ matches }) {
  const groupedMatches = _.groupBy(matches, 'date');
  const navigate = useNavigate();
  return (
    <>
      <Box bg="brand.boxBackground" flexGrow={1} borderRadius="base" pt={4} pb={6} px={5}>
        <Text
          fontWeight="bold"
          color="brand.title"
          fontSize="xl"
          display={{ base: 'none', md: 'flex' }}
        >
          Matches
        </Text>
        <Spacer />
        <TableContainer
          mt={2}
          px={2}
          maxHeight="100%"
          overflowY="scroll"
          overflowX="scroll"
          style={{
            td: {
              textAlign: 'center',
            },
          }}
        >
          <Table size={{ base: 'sm' }} variant="base" className="maches-table">
            <Tbody>
              {Object.keys(groupedMatches)
                .reverse()
                .map((date) => (
                  <>
                    <Tr key={date}>
                      <Td></Td>
                      <Td textAlign="center" color="brand.secondary">
                        {formatDate(new Date(+date), 'dd-MM-yyyy')}
                      </Td>
                      <Td></Td>
                    </Tr>
                    {orderBy(groupedMatches[date], 'date').map((match) => (
                      <Tr cursor={'pointer'} onClick={() => navigate(route.matchDetail(match.id))}>
                        <Td textAlign="left">{match.teams.home.name}</Td>
                        <Td textAlign="center" fontWeight="bold">
                          {match.score.home}:{match.score.guest}
                        </Td>
                        <Td textAlign="right">{match.teams.guest.name}</Td>
                      </Tr>
                    ))}
                  </>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Button
        h="8%"
        padding={5}
        colorScheme="orange"
        w="full"
        onClick={() => navigate(route.matchCreate())}
      >
        <Text>Start a new match </Text>
        <FiPlayCircle style={{ position: 'absolute', right: '2%' }} size={40} />
      </Button>
    </>
  );
}
