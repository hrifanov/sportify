import { Table, TableContainer, Td, Text, Tr, Tbody, Spacer, Button, Box } from '@chakra-ui/react';
import _, { orderBy, truncate } from 'lodash';
import { FiPlayCircle } from 'react-icons/fi';
import { route } from '../../../Routes.js';
import { useNavigate } from 'react-router-dom';
import { formatDate } from 'src/utils/date';
export default function MatchesComp({ matches }) {
  const groupedMatches = _.groupBy(matches, 'date');
  const navigate = useNavigate();
  return (
    <>
      <Box
        bg="brand.boxBackground"
        w="full"
        flexGrow={1}
        borderRadius="base"
        pt={4}
        pb={6}
        px={[0, '', '', 3]}
      >
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
          mt={0}
          mx={0}
          pl={'7px'}
          maxHeight="100%"
          w="full"
          overflowY="scroll"
          overflowX="scroll"
          style={{
            td: {
              textAlign: 'center',
            },
          }}
        >
          <Table mx={0} size={{ base: 'sm' }} variant="base" className="maches-table">
            <Tbody>
              {Object.keys(groupedMatches)
                .reverse()
                .map((date) => (
                  <>
                    <Tr key={date}>
                      <Td></Td>
                      <Td px={0} w={15} textAlign="center" color="brand.secondary">
                        {formatDate(new Date(+date), 'dd-MM-yyyy')}
                      </Td>
                      <Td></Td>
                    </Tr>
                    {orderBy(groupedMatches[date], 'date').map((match) => (
                      <Tr cursor={'pointer'} onClick={() => navigate(route.matchDetail(match.id))}>
                        <Td pl={0} pr={0} maxW="90px" overflowX={'hidden'} textAlign="left">
                          <Text>{truncate(match.teams.home.name, { length: 12 })}</Text>
                        </Td>
                        <Td px={0} w={0} maxW="100px" textAlign="center" fontWeight="bold">
                          {match.score.home}:{match.score.guest}
                        </Td>
                        <Td
                          px={0}
                          mx={0}
                          maxW="90px"
                          textAlign="right"
                          overflow={'hidden'}
                          sx={{
                            '& > span': {
                              minW: 0,
                            },
                          }}
                        >
                          <Text>{truncate(match.teams.guest.name, { length: 12 })}</Text>
                        </Td>
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
