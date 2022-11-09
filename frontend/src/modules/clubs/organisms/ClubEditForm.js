import { Button, Stack, Select } from 'src/shared/design-system';
import { Form, FormField, yup, yupResolver } from 'src/shared/hook-form';

const initialValues = {
  clubName: '',
  locality: '',
  sport: '',
  //TODO rest of the form
};

const schema = yup.object().shape({
  clubName: yup.string().required().label('Club name'),
  locality: yup.string().required().label('Locality'),
});

export function ClubEditForm(isLoading, onSubmit) {
  return (
    <Form onSubmit={onSubmit} defaultValues={initialValues} resolver={yupResolver(schema)}>
      <Stack spacing="3">
        <FormField
          id="clubName"
          name="clubName"
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
    </Form>
  );
}
