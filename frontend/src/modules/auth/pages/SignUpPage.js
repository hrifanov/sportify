import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { signIn } from '../authSlice';
import { SIGN_UP_MUTATION } from '../mutations';
import { SignUpTemplate } from '../templates';

export function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUpRequest, signUpRequestState] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: ({ signUp: { user, token } }) => {
      dispatch(signIn({ token, user }));
      navigate('/');
    },
    onError: () => {},
  });

  const handleSignUpFormSubmit = useCallback(
    (variables) => {
      signUpRequest({ variables });
    },
    [signUpRequest],
  );

  return (
    <SignUpTemplate
      isLoading={signUpRequestState.loading}
      error={signUpRequestState.error}
      onSubmit={handleSignUpFormSubmit}
    />
  );
}
