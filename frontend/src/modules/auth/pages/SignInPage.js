import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { SIGN_IN_MUTATION } from 'src/modules/auth/apollo/mutations';
import { signIn } from 'src/modules/auth/apollo/client';

import { SignInTemplate } from '../templates';
import { route } from 'src/Routes';

export function SignInPage() {
  const navigate = useNavigate();
  const [signInRequest, signInRequestState] = useMutation(SIGN_IN_MUTATION, {
    onCompleted: ({ signin: { user, accessToken } }) => {
      signIn({ accessToken, user });
      navigate(route.clubDetail());
    },
    onError: () => {},
  });

  const handleSignInFormSubmit = useCallback(
    ({ variables, methods }) => {
      signInRequest({ variables });
      if (signInRequestState) {
        const errors = signInRequestState.error.graphQLErrors;
        errors.forEach((error) => {
          console.log('error.extensions.ref', error.extensions.ref);
          console.log('error.message', error.message);
          methods.setError('username', {
            type: error.extensions.ref,
            message: error.message,
          });
        });
      }
      // methods.setError('username', { type: 'server', message: 'ahoj' });
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
