import { Flex, Input } from '@chakra-ui/react';
import Combobox from 'react-widgets/Combobox';
import { Form, FormField } from 'src/shared/hook-form';

export const JoinClubsFilter = ({ clubs, setSportFilter, setLocalityFilter, setNameFilter }) => {
  const sports = [...new Set(clubs?.map((club) => club.sport))];
  const cities = [...new Set(clubs?.map((club) => club.locality))];
  return (
    <Form>
      <Flex width="100%" align={'center'} gap={4} mb={2} flexWrap={['wrap', 'nowrap', 'nowrap']}>
        {/*nefunguje mi tady onChange - pokud víš čím to je, tak prosím poraď, pokud nevíš, tak dej vědět a vrátím to zpátky na Select - to fungovalo*/}
        <FormField
          labelDisplay="none"
          id="sport"
          name="sport"
          input={Combobox}
          data={sports}
          width={['100%', 400, 400]}
          placeholder="All sports"
          onChange={((e) => setSportFilter(e.target.value), (e) => console.log(e.target.value))}
        />
        <FormField
          labelDisplay="none"
          id="locality"
          name="locality"
          input={Combobox}
          data={cities}
          width={['100%', 400, 400]}
          placeholder="All localities"
          onChange={(e) => setLocalityFilter(e.target.value)}
        />
        <Input
          width="100%"
          placeholder="Club name"
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </Flex>
    </Form>
  );
};
