import { Stack, Text, Container } from '@chakra-ui/react';
import { Box, Heading, Button, Flex } from 'src/shared/design-system';
import { RouterLink } from 'src/shared/navigation';
import AppHeader from 'src/shared/core/organisms/AppHeader';
import { ResetPasswordForm } from '../organisms';

import { route } from 'src/Routes';

export function ResetPasswordTemplate({
  token,
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
        <Heading mb="4">Reset password</Heading>

        <Box bg="brand.boxBackground" px={[8, 12]} py={[6, 12]} borderRadius="base">
          {isPasswordResetCompleted ? (
            <Stack spacing="8">
              <Text fontSize="xl" fontWeight="semibold" lineHeight="7">
                Your password has been changed, you can now sign in.
              </Text>
              <Flex
                as={RouterLink}
                to={route.signIn()}
                color="brand.secondary"
                alignItems="center"
                gap={2}
              >
                <Button variant="outline" onClick={() => setIsPasswordResetCompleted(false)}>
                  Go back to sign in
                </Button>
              </Flex>
            </Stack>
          ) : (
            <>
              <ResetPasswordForm
                token={token}
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
