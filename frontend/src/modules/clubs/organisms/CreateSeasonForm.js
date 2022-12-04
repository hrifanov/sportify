import { Button, Flex, Stack } from '@chakra-ui/react';
import { ErrorBanner } from 'src/shared/design-system';
import { Form, FormField, yup, yupResolver } from 'src/shared/hook-form';

export const CreateSeasonForm = ({ onSubmit, loading, error, onClose }) => {
  const schema = yup.object().shape({
    name: yup.string().required().label('name'),
  });

  return (
    <>
      {error?.message && <ErrorBanner mb={2} title={error?.message} />}
      <Form onSubmit={onSubmit} resolver={yupResolver(schema)}>
        <>
          <Stack spacing="3">
            <FormField
              id="name"
              name="name"
              label="Season name"
              placeholder="My amazing season"
              autoFocus="autofocus"
              autoComplete="on"
              autoCorrect="off"
              autoCapitalize="off"
            />

            <Flex align="center">
              <Button ml={'35%'} size="md" type="submit" variant="primary" w={['30%']} mt="4">
                Create
              </Button>
              <Button onClick={onClose} size="md" variant="secondary" w={['35%']} mt="4">
                Cancel
              </Button>
            </Flex>
          </Stack>
        </>
      </Form>
    </>
  );
};
