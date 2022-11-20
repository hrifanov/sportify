import { Button, Stack, Select } from 'src/shared/design-system';
import { Form, FormField, yup, yupResolver } from 'src/shared/hook-form';
import { Text } from '@chakra-ui/react';

const schema = yup.object().shape({
  name: yup.string().required().label('Club name'),
  locality: yup.string().required().label('Locality'),
});

export function ClubEditForm({ club, loading, onSubmit, error, isCompleted, setIsCompleted }) {
  const initialValues = {
    name: club && club.name ? club.name : '',
    locality: club && club.locality ? club.locality : '',
    sport: 'Hockey',
    clubId: '636ecd9840d0be5c9a93e4f2',
    //TODO rest of the form
  };
  // console.log(onSubmit);

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
              placeholder="Concrete spot on John's yard"
              autoFocus="autofocus"
              autoComplete="on"
              autoCorrect="off"
              autoCapitalize="off"
            />
            <FormField
              id="sport"
              name="sport"
              label="Sport"
              InputType={Select}
              autoFocus="autofocus"
              autoComplete="on"
              autoCorrect="off"
              autoCapitalize="off"
              width="100%"
            >
              <option value="hockey">Hockey</option>
            </FormField>
            <Button size="lg" type="submit" variant="primary" w={['100%']} mt="4">
              Update club
            </Button>
          </Stack>
          <FormField id="clubID" name="clubID" display="none"></FormField>
        </>
      )}
      {isCompleted && (
        <>
          <Text>Club has been successfully edited!</Text>
          <Button mt={3} variant={'primary'} onClick={() => setIsCompleted(false)}>
            Reload the form.
          </Button>
        </>
      )}
    </Form>
  );
}
