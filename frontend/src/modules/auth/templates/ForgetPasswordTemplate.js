import { Stack, Text, Container } from '@chakra-ui/react';
import { Box, Heading, Button } from 'src/shared/design-system';
import { RouterLink } from 'src/shared/navigation';
import AppHeader from 'src/shared/core/organisms/AppHeader';
import { ForgetPasswordForm } from '../organisms';

import { route } from 'src/Routes';

export function ForgetPasswordTemplate({
  isLoading,
  error,
  onSubmit,
  isPasswordResetCompleted,
  setIsPasswordResetCompleted,
}) {
  return (
    <>
      <AppHeader inApp={false} />
      <Container maxW="prose" mt={[4, 10]}>
        <Heading mb="4">Forgot password</Heading>

        <Box bg="brand.boxBackground" px={[8, 12]} py={[6, 12]} borderRadius="base">
          {isPasswordResetCompleted ? (
            <Stack spacing="8">
              <Text fontSize="xl" fontWeight="semibold" lineHeight="7">
                Please check your email and click on the link.
              </Text>
              <Button variant="outline" onClick={() => setIsPasswordResetCompleted(false)}>
                Go back to Forgot Password
              </Button>
            </Stack>
          ) : (
            <>
              <ForgetPasswordForm
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
            </>
          )}
        </Box>
      </Container>
    </>
  );
}
