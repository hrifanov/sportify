import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { SIGN_IN_MUTATION } from 'src/modules/auth/apollo/mutations';
import { signIn } from 'src/modules/auth/apollo/client';

import { SignInTemplate } from '../templates';
import { route } from 'src/Routes';

import { getTokenLS } from '../../../utils/TokenLS';

export function SignInPage() {
  const navigate = useNavigate();

  const getDestination = () => {
    const inviteToken = getTokenLS('inviteToken');
    if (inviteToken && inviteToken !== '') {
      return route.acceptInvite(inviteToken);
    }
    return route.dashboard();
  };

  const destination = getDestination();

  const [signInRequest, signInRequestState] = useMutation(SIGN_IN_MUTATION, {
    onCompleted: ({ signin: { user, accessToken } }) => {
      signIn({ accessToken, user });
      navigate(destination);
    },
    onError: () => {},
  });

  const handleSignInFormSubmit = useCallback(
    (variables) => {
      signInRequest({ variables });
    },
    [signInRequest],
  );

  return (
    <SignInTemplate
      isLoading={signInRequestState.loading}
      error={signInRequestState.error}
      onSubmit={handleSignInFormSubmit}
    />
  );
}
