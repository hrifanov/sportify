import { Box, Heading } from 'src/shared/design-system';
import { RouterLink } from 'src/shared/navigation';

import { route } from 'src/Routes';

import { MainSection } from 'src/shared/core/atoms/MainSection';
import { SignInForm } from '../organisms';

export function SignInTemplate({ isLoading, error, onSubmit }) {
  return (
    <MainSection maxW="prose" mt={10}>
      <Heading pb="4">Sign In</Heading>

      <SignInForm
        isLoading={isLoading}
        errorMessage={error && error.message}
        onSubmit={onSubmit}
      >
        <Box>
          or <RouterLink to={route.signUp()}>Sign Up</RouterLink>
        </Box>
      </SignInForm>
    </MainSection>
  );
}
