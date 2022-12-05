import { Flex, Select, Spacer, Text } from '@chakra-ui/react';
import { RoleEnum } from 'src/modules/matches/enums';

export const StatisticsFilter = ({ club, setSeasonFilter, setRoleFilter }) => {
  return (
    <Flex align={'center'} gap={4}>
      <Select onChange={(e) => setSeasonFilter(e.target.value)}>
        {club.seasons.map((season) => (
          <option value={season.id}>{season.name}</option>
        ))}
      </Select>
      <Select onChange={(e) => setRoleFilter(e.target.value)}>
        <option value={RoleEnum.ATTACK}>Outfield</option>
        <option value={RoleEnum.GOALKEEPER}>Goalkeepers</option>
      </Select>
    </Flex>
  );
};
