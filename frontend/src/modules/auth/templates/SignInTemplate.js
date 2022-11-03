import { Container } from '@chakra-ui/react';
import { Box, Heading, Button } from 'src/shared/design-system';
import { RouterLink } from 'src/shared/navigation';
import AppHeader from 'src/shared/core/organisms/AppHeader';

import { route } from 'src/Routes';

import { SignInForm } from '../organisms';

export function SignInTemplate({ isLoading, error, onSubmit }) {
  return (
    <>
      <AppHeader inApp={false} />
      <Container maxW="prose" mt={[4, 10]}>
        <Box bg="brand.boxBackground" px={[8, 12]} py={[6, 12]} borderRadius="base">
          <Heading pb="4">Sign In</Heading>
          <SignInForm
            isLoading={isLoading}
            errorMessage={error && error.message}
            onSubmit={onSubmit}
          />
          <Box textAlign="center" my={4}>
            or
          </Box>
          <Box>
            <RouterLink to={route.signUp()} style={{ textDecoration: 'none' }}>
              <Button size="lg" variant="outline" w="full">
                Sign Up
              </Button>
            </RouterLink>
          </Box>
        </Box>
      </Container>
    </>
  );
}
