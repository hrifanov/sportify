import { useQuery } from '@apollo/client';
import { DISTRICTS_QUERY } from 'src/modules/clubs/apollo/queries';

export const useDistricts = () => {
  const { data: districtsData } = useQuery(DISTRICTS_QUERY);
  const districts = districtsData?.enums?.districts;

  const formatDistrictLabel = (districtKey) => {
    return districts?.find((d) => d.key === districtKey).value;
  };

  return {
    districts,
    formatDistrictLabel,
  };
};
