import { Button, ErrorBanner, Flex, Stack } from 'src/shared/design-system';
import { Form, FormField, yup, yupResolver } from 'src/shared/hook-form';

const initialValues = {
  username: '',
};

const schema = yup.object().shape({
  username: yup.string().required().label('Username'),
});

export function ForgetPasswordForm({ isLoading, errorMessage, onSubmit, children }) {
  return (
    <Form onSubmit={onSubmit} defaultValues={initialValues} resolver={yupResolver(schema)}>
      <Stack spacing="3">
        {errorMessage && <ErrorBanner title={errorMessage} />}
        <FormField
          id="username"
          name="username"
          label="Username"
          type="text"
          placeholder="jDoe98"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <Flex align="center" justify="center">
          <Button
            size="lg"
            type="submit"
            isLoading={isLoading}
            variant="primary"
            w={['100%']}
            mt="4"
          >
            Send reset link
          </Button>
        </Flex>
      </Stack>
    </Form>
  );
}
