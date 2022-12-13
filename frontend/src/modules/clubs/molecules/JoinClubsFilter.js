import { Flex, Input } from '@chakra-ui/react';
import Combobox from 'react-widgets/Combobox';
import { Form, FormField, yupResolver } from 'src/shared/hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import { DISTRICTS_QUERY } from 'src/modules/clubs/apollo/queries';
import { useDistricts } from 'src/shared/core/hooks/useDistricts';

export const JoinClubsFilter = ({ clubs, setFilters }) => {
  const { districts } = useDistricts();
  const defaultCityOption = { key: '', value: 'All localities' };
  const defaultSportOption = { key: '', value: 'All sports' };

  const sportsOptions = [
    defaultSportOption,
    ...[...new Set(clubs?.map((club) => club.sport))].map((sport) => ({
      key: sport,
      value: sport,
    })),
  ];

  const citiesOptions = [
    defaultCityOption,
    ...[...new Set(clubs?.map((club) => club.locality))].map((city) =>
      districts?.find((district) => district.key === city),
    ),
  ];

  const formMethods = useForm({
    defaultValues: {
      name: '',
      sport: defaultSportOption,
      locality: defaultCityOption,
    },
  });

  formMethods.watch(() => {
    setFilters(formMethods.getValues());
  });

  return (
    <FormProvider {...formMethods}>
      <Flex width="100%" align={'center'} gap={4} mb={2} flexWrap={['wrap', 'nowrap', 'nowrap']}>
        <FormField
          labelDisplay="none"
          id="sport"
          name="sport"
          input={Combobox}
          data={sportsOptions}
          dataKey={'key'}
          textField={'value'}
          width={['100%', 400, 400]}
          placeholder="All sports"
        />
        <FormField
          labelDisplay="none"
          id="locality"
          name="locality"
          input={Combobox}
          data={citiesOptions}
          dataKey={'key'}
          textField={'value'}
          width={['100%', 400, 400]}
          placeholder="All localities"
        />
        <FormField labelDisplay="none" name="name" width="100%" placeholder="Club name" />
      </Flex>
    </FormProvider>
  );
};
