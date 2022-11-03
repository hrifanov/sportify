import { Button, ErrorBanner, Flex, Stack } from 'src/shared/design-system';
import { Form, FormField, yup, yupResolver } from 'src/shared/hook-form';

const initialValues = {
  email: '',
  name: '',
  password: '',
  passwordConfirmation: '',
  userName: '',
};

const schema = yup.object().shape({
  email: yup.string().email().required().label('Email'),
  name: yup.string().required().label('Name'),
  password: yup.string().required().label('Password'),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .label('Password Confirmation'),
  userName: yup.string().required().label('Username'),
});

export function SignUpForm({ isLoading, errorMessage, onSubmit, children }) {
  return (
    <Form onSubmit={onSubmit} defaultValues={initialValues} resolver={yupResolver(schema)}>
      <Stack spacing="3">
        {errorMessage && <ErrorBanner title={errorMessage} />}
        <FormField
          id="name"
          name="name"
          label="Name"
          type="text"
          placeholder="John Doe"
          autoFocus="autofocus"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormField
          id="userName"
          name="userName"
          label="Username"
          type="text"
          placeholder="jDoe98"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormField
          id="email"
          name="email"
          label="Email"
          type="text"
          placeholder="john@doe.com"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
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
            Sign Up
          </Button>
        </Flex>
      </Stack>
    </Form>
  );
}
