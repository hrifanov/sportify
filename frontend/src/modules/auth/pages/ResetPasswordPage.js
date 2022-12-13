import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD_MUTATION } from 'src/modules/auth/apollo/mutations';
import { ResetPasswordTemplate } from 'src/modules/auth/templates';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export function ResetPasswordPage() {
  const { token } = useParams();

  const [isPasswordResetCompleted, setIsPasswordResetCompleted] = useState(false);

  const [resetPasswordRequest, resetPasswordRequestState] = useMutation(RESET_PASSWORD_MUTATION, {
    onCompleted: () => setIsPasswordResetCompleted(true),
    onError: () => {},
  });

  const handlePasswordResetFormSubmit = useCallback(
    (variables) => {
      resetPasswordRequest({ variables: { ...variables, token } });
    },
    [resetPasswordRequest, token],
  );

  return (
    <ResetPasswordTemplate
      token={token}
      isPasswordResetCompleted={isPasswordResetCompleted}
      setIsPasswordResetCompleted={setIsPasswordResetCompleted}
      isLoading={resetPasswordRequestState.loading}
      error={resetPasswordRequestState.error}
      onSubmit={handlePasswordResetFormSubmit}
    />
  );
}
