import { Button, Flex, Stack } from 'src/shared/design-system';
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

export function AddPlayerForm(isLoading, onSubmit) {
  return (
    <Form onSubmit={onSubmit} defaultValues={initialValues} resolver={yupResolver(schema)}>
      <Stack direction="row" spacing="3">
        <FormField
          id="email"
          name="email"
          label="Add Players"
          placeholder="Email of a player"
          autoFocus="autofocus"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
          pr={0}
          mr={0}
        />
        <Flex align={'end'} ml={0}>
          <Button size="md" type="submit" variant="primary" w={['100%']} mt="4">
            Add
          </Button>
        </Flex>
      </Stack>
    </Form>
  );
}
