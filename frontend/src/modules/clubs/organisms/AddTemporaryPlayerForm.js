import { Button, Flex, Stack } from 'src/shared/design-system';
import { Text } from '@chakra-ui/react';
import { Form, FormField, yup, yupResolver } from 'src/shared/hook-form';

const schema = yup.object().shape({
  name: yup.string().required(),
});

export function AddTemporaryPlayerForm({ onSubmit, isLoading }) {
  const initialValues = {
    name: '',
  };

  return (
    <Stack w={['250px', '300px', '350px']}>
      <Form
        onSubmit={onSubmit}
        defaultValues={initialValues}
        resolver={yupResolver(schema)}
        resetOnSubmit={true}
      >
        <Stack direction="row" spacing="3">
          <FormField
            id="name"
            name="name"
            label="Add a temporary player"
            placeholder="Name of the player"
            autoFocus="autofocus"
            autoComplete="on"
            autoCorrect="off"
            autoCapitalize="off"
            pr={0}
            mr={0}
          />
          <Flex pt={4}>
            <Button
              size="md"
              type="submit"
              isLoading={isLoading}
              variant="primary"
              w={['100%']}
              mt="4"
            >
              Add
            </Button>
          </Flex>
        </Stack>
      </Form>
    </Stack>
  );
}
