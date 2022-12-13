import { Button, ErrorBanner, Flex, Stack } from 'src/shared/design-system';
import { Form, FormField, yup, yupResolver } from 'src/shared/hook-form';
const initialValues = {
  password: '',
};
const schema = yup.object().shape({
  password: yup.string().required().label('Password'),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .label('Password Confirmation'),
});

export function ResetPasswordForm({ isLoading, errorMessage, onSubmit, children }) {
  return (
    <Form onSubmit={onSubmit} defaultValues={initialValues} resolver={yupResolver(schema)}>
      <Stack spacing="3">
        {errorMessage && <ErrorBanner title={errorMessage} />}
        <FormField
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormField
          id="passwordConfirmation"
          name="passwordConfirmation"
          label="Password Confirmation"
          placeholder="Repeat, so you don't forget :)"
          type="password"
          autoComplete="off"
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
            Reset password
          </Button>
        </Flex>
      </Stack>
    </Form>
  );
}
