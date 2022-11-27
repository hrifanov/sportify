import { Table, TableContainer, Td, Text, Tr, Tbody, Spacer, Button, Box } from '@chakra-ui/react';
import _ from 'lodash';
import { FiPlayCircle } from 'react-icons/fi';
import { route } from '../../../Routes.js';
import { useNavigate } from 'react-router-dom';
export default function MatchesComp({ matches }) {
  const navigate = useNavigate();

  return (
    <>
      <Box h="92%" borderRadius="base" pt={4} pb={6} px={5}>
        <Text fontWeight="bold" color="brand.title" fontSize="xl">
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
              {Object.keys(matches).map((i) => (
                <>
                  <Tr key={i}>
                    <Td></Td>
                    <Td textAlign="center" color="brand.secondary">
                      2019-01-01
                    </Td>
                    <Td></Td>
                  </Tr>
                  <Tr key={matches[i].id}>
                    <Td textAlign="left">{matches[i].teams.home.name}</Td>
                    <Td textAlign="center" fontWeight="bold">
                      1 : 3
                    </Td>
                    <Td textAlign="right">{matches[i].teams.guest.name}</Td>
                  </Tr>
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
        onClick={() => navigate(route.createMatch())}
      >
        <Text>Start a new match </Text>
        <FiPlayCircle style={{ position: 'absolute', right: '2%' }} size={40} />
      </Button>
    </>
  );
}
