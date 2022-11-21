import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { SIGN_IN_MUTATION } from 'src/modules/auth/apollo/mutations';
import { signIn } from 'src/modules/auth/apollo/client';

import { SignInTemplate } from '../templates';
import { route } from 'src/Routes';

import { getTokenLS } from '../../clubs/molecules/TokenLS';

export function SignInPage() {
  const navigate = useNavigate();

  const getDestination = () => {
    const inviteToken = getTokenLS('inviteToken');
    if (inviteToken && inviteToken !== '') {
      // console.log('jsme na login page a hodnota tokenu je: ' + inviteToken);
      // return route.acceptInvite().substring(0, route.acceptInvite().indexOf(':')) + inviteToken;
      return route.acceptInvite(inviteToken);
    }
    // console.log('Jsme na login a invite token neexistuje: ' + inviteToken);
    return route.clubDetail();
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
