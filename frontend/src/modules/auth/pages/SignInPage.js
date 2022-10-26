import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { signIn } from '../authSlice';

import { SIGN_IN_MUTATION } from '../mutations';

import { SignInTemplate } from '../templates';

export function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signInRequest, signInRequestState] = useMutation(SIGN_IN_MUTATION, {
    onCompleted: ({ signIn: { user, token } }) => {
      dispatch(signIn({ token, user }));
      navigate('/');
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
