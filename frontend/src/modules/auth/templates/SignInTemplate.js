import { Box, Heading } from 'src/shared/design-system';
import { RouterLink, MainSection, TopNavigation } from 'src/shared/navigation';

import { route } from 'src/Routes';

import { SignInForm } from '../organisms';

export function SignInTemplate({ isLoading, error, onSubmit }) {
  return (
    <>
      <TopNavigation />
      <MainSection>
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
    </>
  );
}
