import { Button, Stack } from 'src/shared/design-system';
import { Form, FormField, yup, yupResolver } from 'src/shared/hook-form';
import { Text } from '@chakra-ui/react';
import { Combobox } from 'react-widgets';
import { FileInput } from 'src/modules/clubs/atoms/FileInput';

const schema = yup.object().shape({
  name: yup.string().required().label('Club name'),
  locality: yup.string().required().label('Locality'),
});

export function ClubEditForm({ club, onSubmit, isCompleted, setIsCompleted, districts }) {
  // console.log('districts: ' + JSON.stringify(districts.districts));
  districts = districts?.districts;

  const districtsLabels = [];

  districts.forEach((district) => {
    // console.log('district: ' + JSON.stringify(district.value));
    districtsLabels.push(district.value);
  });

  const localityValue = districts.find((district) => district?.key === club?.locality)?.value;

  // console.log('localityValue: ' + JSON.stringify(localityValue));

  const initialValues = {
    name: club && club.name ? club.name : '',
    locality: localityValue ? localityValue : '',
    sport: club && club.sport ? club.sport : '',
    logo: '',
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={initialValues} resolver={yupResolver(schema)}>
      {!isCompleted && (
        <>
          <Stack spacing="3">
            <FormField
              id="name"
              name="name"
              label="Club name"
              placeholder="My amazing club"
              autoFocus="autofocus"
              autoComplete="on"
              autoCorrect="off"
              autoCapitalize="off"
            />
            <FormField
              id="locality"
              name="locality"
              label="Locality"
              placeholder="City"
              input={Combobox}
              data={districtsLabels}
              autoComplete="on"
              autoCorrect="off"
              autoCapitalize="off"
            />
            <FormField
              id="sport"
              name="sport"
              label="Sport"
              input={Combobox}
              data={['Hockey', 'Floorball']}
              placeholder={'Sport'}
              input-height="36px"
            />
            <FormField
              id="logo"
              name="logo"
              label="Logo"
              input={FileInput}
              input-height="36px"
            ></FormField>
            <Button size="lg" type="submit" variant="primary" w={['100%']}>
              Update club
            </Button>
          </Stack>
          {/* <FormField id="clubID" name="clubID" display="none"></FormField> */}
        </>
      )}
      {isCompleted && (
        <>
          <Text>Club has been successfully edited!</Text>
          <Button mt={3} w="100%" variant={'primary'} onClick={() => setIsCompleted(false)}>
            Reload the form.
          </Button>
        </>
      )}
    </Form>
  );
}
