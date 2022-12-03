import { Table, TableContainer, Td, Text, Tr, Tbody, Spacer, Button, Box } from '@chakra-ui/react';
import _ from 'lodash';
import { FiPlayCircle } from 'react-icons/fi';
import { route } from '../../../Routes.js';
import { useNavigate } from 'react-router-dom';
export default function MatchesComp({ matches }) {
  const groupedMatches = _.groupBy(matches, 'date');
  const navigate = useNavigate();
  return (
    <>
      <Box h="92%" borderRadius="base" pt={4} pb={6} px={5}>
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
              {Object.keys(groupedMatches).map((date) => (
                <>
                  <Tr key={date}>
                    <Td></Td>
                    <Td textAlign="center" color="brand.secondary">
                      {new Date(date).toLocaleDateString('en-CA')}
                    </Td>
                    <Td></Td>
                  </Tr>
                  {groupedMatches[date].map((match) => (
                    <Tr>
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
