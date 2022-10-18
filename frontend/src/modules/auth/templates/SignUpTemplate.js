import { Box, Heading } from 'src/shared/design-system';
import { RouterLink, MainSection, TopNavigation } from 'src/shared/navigation';

import { route } from 'src/Routes';

import { SignUpForm } from '../organisms';

export function SignUpTemplate({ isLoading, error, onSubmit }) {
  return (
    <>
      <TopNavigation />
      <MainSection>
        <Heading mb="4">Sign Up</Heading>

        <SignUpForm
          isLoading={isLoading}
          errorMessage={error && error.message}
          onSubmit={onSubmit}
        >
          <Box>
            or <RouterLink to={route.signIn()}>Sign In</RouterLink>
          </Box>
        </SignUpForm>
      </MainSection>
    </>
  );
}
