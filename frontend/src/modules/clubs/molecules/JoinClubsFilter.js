import { Flex, Select, Spacer, Text, Input } from '@chakra-ui/react';

export const JoinClubsFilter = ({ clubs, setSportFilter, setLocalityFilter, setNameFilter }) => {
  const sports = [...new Set(clubs?.map((club) => club.sport))];
  const cities = [...new Set(clubs?.map((club) => club.locality))];
  return (
    <Flex width="100%" align={'center'} gap={4} mb={2} flexWrap={['wrap', 'nowrap', 'nowrap']}>
      <Select
        width={['100%', 400, 400]}
        placeholder="All sports"
        onChange={(e) => setSportFilter(e.target.value)}
      >
        {sports.map((sport, i) => (
          <option key={i} variant="popup" size="sm">
            {sport}
          </option>
        ))}
      </Select>
      <Select
        width={['100%', 400, 400]}
        placeholder="All localities"
        onChange={(e) => setLocalityFilter(e.target.value)}
      >
        {cities.map((city, i) => (
          <option key={i} variant="popup" size="sm">
            {city}
          </option>
        ))}
      </Select>
      <Input width="100%" placeholder="Club name" onChange={(e) => setNameFilter(e.target.value)} />
    </Flex>
  );
};
