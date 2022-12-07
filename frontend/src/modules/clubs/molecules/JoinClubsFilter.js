import { Flex, Select, Spacer, Text } from '@chakra-ui/react';

export const JoinClubsFilter = ({ clubs, setSportFilter, setLocalityFilter }) => {
  const sports = [...new Set(clubs?.map((club) => club.sport))];
  const cities = [...new Set(clubs?.map((club) => club.locality))];
  return (
    <Flex width="100%">
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
    </Flex>
  );
};
