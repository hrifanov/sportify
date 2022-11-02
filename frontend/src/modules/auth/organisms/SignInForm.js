import { Link, theme } from '@chakra-ui/react';
import { Button, Flex, Stack } from 'src/shared/design-system';
import { Form, FormField, yup, yupResolver } from 'src/shared/hook-form';

const initialValues = {
  username: '',
  password: '',
};

const schema = yup.object().shape({
  username: yup.string().required().label('Username'),
  password: yup.string().required().label('Password'),
});

export function SignInForm({ isLoading, errorMessage, onSubmit, children }) {
  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={initialValues}
      resolver={yupResolver(schema)}
    >
      <Stack spacing="3">
        <FormField
          id="username"
          name="username"
          label="Username"
          placeholder="Type your username"
          autoFocus="autofocus"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormField
          id="password"
          name="password"
          label="Password"
          placeholder="Type your password"
          type="password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <Flex justify="right">
          <Link>Forgot password?</Link>
        </Flex>
        <Flex align="center" justify="center">
          <Button
            size="lg"
            type="submit"
            isLoading={isLoading}
            variant="primary"
            w={['100%']}
            mt="4"
          >
            Sign In
          </Button>
        </Flex>
      </Stack>
    </Form>
  );
}
