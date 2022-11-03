import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGN_UP_MUTATION } from 'src/modules/auth/apollo/mutations';
import { SignUpTemplate } from 'src/modules/auth/templates';

export function SignUpPage() {
  const [isSignUpCompleted, setIsSignUpCompleted] = useState(false);

  const [signUpRequest, signUpRequestState] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: () => setIsSignUpCompleted(true),
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
      isSignUpCompleted={isSignUpCompleted}
      setIsSignUpCompleted={setIsSignUpCompleted}
      isLoading={signUpRequestState.loading}
      error={signUpRequestState.error}
      onSubmit={handleSignUpFormSubmit}
    />
  );
}
