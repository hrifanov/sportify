import { Box, Heading, Button } from 'src/shared/design-system';
import { RouterLink } from 'src/shared/navigation';

import { route } from 'src/Routes';

import { MainSection } from 'src/shared/core/atoms/MainSection';
import { SignUpForm } from '../organisms';

export function SignUpTemplate({ isLoading, error, onSubmit }) {
  return (
    <MainSection maxW="prose" mt={[4, 10]}>
      <Box
        bg="brand.boxBackground"
        px={[8, 12]}
        py={[6, 12]}
        borderRadius="base"
      >
        <Heading mb="4">Sign Up</Heading>

        <SignUpForm
          isLoading={isLoading}
          errorMessage={error && error.message}
          onSubmit={onSubmit}
        />
        <Box textAlign="center" my={4}>
          or
        </Box>
        <Box>
          <RouterLink to={route.signIn()} style={{ textDecoration: 'none' }}>
            <Button size="lg" variant="outline" w="full">
              Sign In
            </Button>
          </RouterLink>
        </Box>
      </Box>
    </MainSection>
  );
}
