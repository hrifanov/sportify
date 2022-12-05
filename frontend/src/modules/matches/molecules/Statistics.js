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
} from '@chakra-ui/react';

import { filter, groupBy } from 'lodash';
import { RoleEnum, TeamsEnum } from 'src/modules/matches/enums';
import { AiOutlineHome } from 'react-icons/ai';
import { BsArrow90DegDown } from 'react-icons/bs';
import { RoleIcon } from 'src/modules/matches/atoms/RoleIcon';

export default function Statistics({
  cumulative = false,
  statistics,
  match,
  role = RoleEnum.ATTACK,
  ...props
}) {
  const layoutByRole = {
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
      P: 'penalties',
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
    [RoleEnum.ATTACK]: 'canadianPoints',
    [RoleEnum.GOALKEEPER]: 'goalsSaved',
  };

  const currentLayout = layoutByRole[role];

  const filteredStatistics = role
    ? filter(statistics, (player) => player.statistics.roles.includes(role))
    : statistics;

  const statisticsGroupedByPoints = groupBy(
    filteredStatistics,
    `statistics.${pointsKeyByRole[role]}`,
  );
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
          {reversedPointKeys.map((pointKey, position) => {
            return statisticsGroupedByPoints[pointKey].map((player) => (
              <Tr key={player.user.id}>
                <Td textColor="white">
                  {position + 1}.
                </Td>
                <Td textColor="white">
                  <RoleIcon role={role} />
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
                {Object.keys(currentLayout).map((label) => (
                  <Td key={label}>{player.statistics[currentLayout[label]]}</Td>
                ))}
              </Tr>
            ));
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
