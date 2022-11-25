import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Container, Text, Button, Box, Stack, Flex, Spinner } from '@chakra-ui/react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { route } from 'src/Routes';
import { Heading } from 'src/shared/design-system';
import AppHeader from 'src/shared/core/organisms/AppHeader';
import { putTokenLS, getTokenLS } from '../molecules/TokenLS';
import { ACCEPT_INVITE_MUTATION } from 'src/modules/clubs/apollo/mutations';
import { signOut } from 'src/modules/auth/apollo/client';
import { useToast } from '@chakra-ui/react';
import { useAuthClient } from 'src/modules/auth/apollo/client';
import { GetTokenInfo } from '../organisms/GetTokenInfo';

export function AcceptInvitePage() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [invitationIsFinished, setInvitationIsFinished] = useState(false);

  if (!getTokenLS('inviteToken') && !invitationIsFinished) {
    putTokenLS('inviteToken', token);
  }

  const { user } = useAuthClient();

  const { email, clubName, doesUserExist } = GetTokenInfo(token);

  const tokenFromLS = getTokenLS('inviteToken');

  const [verifyAccountRequest, { data, loading, error }] = useMutation(ACCEPT_INVITE_MUTATION);

  const acceptInviteAction = useCallback(() => {
    const variables = { token: tokenFromLS };
    verifyAccountRequest({ variables });
    putTokenLS('inviteToken', '');
    setInvitationIsFinished(true);
    console.log('tady ten token má být odebraný. ');
  }, [verifyAccountRequest, tokenFromLS]);

  //** Main logic */
  const Content = () => {
    const toast = useToast();

    if (loading) {
      return (
        <>
          <Spinner size="xl" />
          <Text>Loading...</Text>
        </>
      );
    }
    if (error) {
      return (
        <>
          <Text>Failed.</Text>
          <Button
            variant="primary"
            onClick={() => {
              navigate(route.clubDetail());
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
          <Text fontWeigh>Accepted!</Text>
          <Button
            variant="primary"
            onClick={() => {
              navigate(route.clubDetail());
            }}
          >
            Get me to my team
          </Button>
        </>
      );
    }

    // If there is no user signed in, redirect to signin.
    // If the user from the invitation does not even exist, redirect straight to sign up.
    if (!user) {
      if (doesUserExist === true) {
        toast({
          title: 'To accept the invitation, you have to be logged in first. ',
          status: 'info',
          position: 'top-right',
          duration: 6000,
          isClosable: true,
        });
        return <Navigate to={route.signIn()} replace />;
      }
      if (doesUserExist === false) {
        toast({
          title: 'To accept the invitation, you have create your account first. ',
          status: 'info',
          position: 'top-right',
          duration: 6000,
          isClosable: true,
        });
        return (
          <>
            <Heading as="h2" mb="4">
              Redirecting...
            </Heading>

            <Navigate to={route.signUp()} replace />
          </>
        );
      }
    }

    // If a user is signed in, check whether it is the same as in the invitation
    if (user) {
      // If it is the same user, give him the option to accept the invitation
      if (user.email === email) {
        return (
          <>
            <Heading as="h2" mb="4">
              You were invited to a new club.
            </Heading>
            <Heading as="h3" mb={3}>
              "{clubName}"
            </Heading>
            <Box>
              <Flex mt="20px">
                <Button
                  variant="primary"
                  onClick={() => {
                    putTokenLS('inviteToken', '');
                    acceptInviteAction();
                  }}
                >
                  Accept invitation
                </Button>
                <Button
                  ml={5}
                  variant="outline"
                  onClick={() => {
                    putTokenLS('inviteToken', '');
                    setInvitationIsFinished(true);
                    navigate(route.clubDetail());
                  }}
                >
                  Decline
                </Button>
              </Flex>
            </Box>
          </>
        );
      }
      // If a user is logged in, but is different from the invited one,
      // sign him out and clear LS, so he will not see the message again
      if (user.email !== email && email) {
        toast({
          title:
            'It seems that you were trying to accept an invitation. However, you were logged in as another user, than the invitation was meant for. Try logging in and clicking the link again please. ',
          status: 'error',
          position: 'top-right',
          duration: 10000,
          isClosable: true,
        });
        signOut();
        putTokenLS('inviteToken', '');
        return <Navigate to={route.signIn()} replace />;
      }
    }
  };

  return (
    <>
      <AppHeader inApp={false} />
      <Container maxW="prose" mt={[4, 10]}>
        <Box bg="brand.boxBackground" px={[8, 12]} py={[6, 12]} borderRadius="base">
          <Stack spacing={4} align="center">
            <Content />
          </Stack>
        </Box>
      </Container>
    </>
  );
}
