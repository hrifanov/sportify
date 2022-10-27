import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGN_UP_MUTATION } from 'src/modules/auth/apollo/mutations';
import { signIn } from 'src/modules/auth/apollo/client';
import { SignUpTemplate } from 'src/modules/auth/templates';

export function SignUpPage() {
  const navigate = useNavigate();
  const [signUpRequest, signUpRequestState] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: ({ signUp: { user, token } }) => {
      signIn({ token, user });
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
