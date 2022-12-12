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
  Box,
  HStack,
} from '@chakra-ui/react';

import { filter, groupBy, orderBy } from 'lodash';
import { RoleEnum, TeamsEnum } from 'src/modules/matches/enums';
import { AiOutlineHome } from 'react-icons/ai';
import { BsArrow90DegDown } from 'react-icons/bs';
import { RoleIcon } from 'src/modules/matches/atoms/RoleIcon';

export default function Statistics({
  cumulative = false,
  statistics,
  match,
  role = RoleEnum.ALL,
  ...props
}) {
  if (!statistics)
    return (
      <Box px={5} py={4}>
        <Text>No statistics available</Text>
      </Box>
    );

  const layoutByRole = {
    [RoleEnum.ALL]: {
      ...(cumulative
        ? {
            M: 'gamesTotal',
            W: 'winsTotal',
          }
        : {}),
    },
    [RoleEnum.ATTACK]: {
      ...(cumulative
        ? {
            AVG: 'avgCanadianPoints',
            M: 'gamesAttacker',
          }
        : {}),
      C: 'canadianPoints',
      G: 'goals',
      A: 'assists',
      P: 'totalPenaltiesLength',
    },
    [RoleEnum.GOALKEEPER]: {
      ...(cumulative
        ? {
            M: 'gamesGoalkeeper',
          }
        : {}),
      S: 'goalsSaved',
      P: 'goalsPassed',
    },
  };

  const pointsKeyByRole = {
    [RoleEnum.ALL]: 'statistics.winsTotal',
    [RoleEnum.ATTACK]: 'statistics.canadianPoints',
    [RoleEnum.GOALKEEPER]: 'statistics.goalsSaved',
  };

  const currentLayout = layoutByRole[role];

  const isRoleAll = role === RoleEnum.ALL;

  const filteredStatistics = !isRoleAll
    ? filter(statistics, (player) => player.statistics.roles.includes(role))
    : statistics;

  const statisticsGroupedByPoints = groupBy(filteredStatistics, pointsKeyByRole[role]);
  const reversedPointKeys = Object.keys(statisticsGroupedByPoints).reverse();

  return (
    <TableContainer
      {...props}
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
            <Th textAlign="left">Place</Th>
            <Th>Role</Th>
            {!cumulative && <Th>Team</Th>}
            <Th textAlign="left">Name</Th>
            {Object.keys(currentLayout).map((label) => (
              <Th key={label}>{label}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody color="rgba(255,255,255,0.85)">
          {reversedPointKeys.length === 0 && (
            <Tr>
              <Td colSpan={Object.keys(currentLayout).length + 4}>
                <Text py={5}>No statistics available</Text>
              </Td>
            </Tr>
          )}
          {reversedPointKeys.map((pointKey, position) => {
            return orderBy(
              statisticsGroupedByPoints[pointKey],
              ['statistics.gamesTotal'],
              ['desc'],
            ).map((player) => (
              <Tr key={player.user.id}>
                <Td textColor="white">{position + 1}.</Td>
                <Td textColor="white">
                  {!isRoleAll ? (
                    <RoleIcon role={role} />
                  ) : (
                    <HStack gap={2} justify={'start'}>
                      {player.statistics.roles.map((playerRole) => (
                        <RoleIcon role={playerRole} />
                      ))}
                    </HStack>
                  )}
                </Td>
                {!cumulative && (
                  <Td textColor="white">
                    <Icon
                      as={player.teamId === TeamsEnum.HOME ? AiOutlineHome : BsArrow90DegDown}
                      boxSize={5}
                    />
                  </Td>
                )}
                <Td textAlign="left" textColor="white">
                  {player.user.name}
                </Td>
                {Object.keys(currentLayout).map((label) => {
                  const value = player.statistics[currentLayout[label]];
                  const formattedValue = Math.round(value * 100) / 100;
                  return <Td key={label}>{formattedValue}</Td>;
                })}
              </Tr>
            ));
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
