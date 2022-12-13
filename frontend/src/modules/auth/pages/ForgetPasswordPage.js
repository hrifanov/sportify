import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import { FORGET_PASSWORD_MUTATION } from 'src/modules/auth/apollo/mutations';
import { ForgetPasswordTemplate } from 'src/modules/auth/templates';

export function ForgetPasswordPage() {
  const [isPasswordResetCompleted, setIsPasswordResetCompleted] = useState(false);

  const [resetPasswordRequest, resetPasswordRequestState] = useMutation(FORGET_PASSWORD_MUTATION, {
    onCompleted: () => setIsPasswordResetCompleted(true),
    onError: () => {},
  });

  const handlePasswordResetFormSubmit = useCallback(
    (variables) => {
      resetPasswordRequest({ variables });
    },
    [resetPasswordRequest],
  );

  return (
    <ForgetPasswordTemplate
      isPasswordResetCompleted={isPasswordResetCompleted}
      setIsPasswordResetCompleted={setIsPasswordResetCompleted}
      isLoading={resetPasswordRequestState.loading}
      error={resetPasswordRequestState.error}
      onSubmit={handlePasswordResetFormSubmit}
    />
  );
}
