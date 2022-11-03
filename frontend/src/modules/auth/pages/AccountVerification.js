import { useMutation } from '@apollo/client';
import { VERIFY_ACCOUNT_MUTATION } from 'src/modules/auth/apollo/mutations';
import { route } from 'src/Routes';
import { Box, Button, Heading } from 'src/shared/design-system';
import { Spinner, Stack, Text } from '@chakra-ui/react';
import { MainSection } from 'src/shared/core/atoms/MainSection';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export function AccountVerification() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [verifyAccountRequest, { data, loading, error }] = useMutation(VERIFY_ACCOUNT_MUTATION);

  useEffect(() => {
    verifyAccountRequest({ variables: { token } });
  }, [token, navigate, verifyAccountRequest]);

  const Content = () => {
    if (loading) {
      return (
        <>
          <Spinner size="xl" />
          <Text fontWeigh>Verifying account...</Text>
        </>
      );
    }
    if (error) {
      return (
        <>
          <Text fontWeigh>Account verification failed.</Text>
          <Button
            variant="primary"
            onClick={() => {
              navigate(route.signIn());
            }}
          >
            Sign In
          </Button>
        </>
      );
    }
    if (data) {
      return (
        <>
          <Text fontWeigh>Account verified successfully!</Text>
          <Button
            variant="primary"
            onClick={() => {
              navigate(route.signIn());
            }}
          >
            Sign In
          </Button>
        </>
      );
    }
  };

  return (
    <MainSection maxW="prose" mt={[4, 10]}>
      <Heading mb="4">Account verification</Heading>

      <Box bg="brand.boxBackground" px={[8, 12]} py={[6, 12]} borderRadius="base">
        <Stack spacing={4} align="center">
          <Content />
        </Stack>
      </Box>
    </MainSection>
  );
}
