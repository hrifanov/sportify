import { Route, Routes as RouterRoutes, Navigate } from 'react-router-dom';
import { NotFoundPage } from 'src/shared/navigation/pages/NotFoundPage';
import { SignInPage, SignUpPage } from 'src/modules/auth';
import ClubDetailPage from './modules/clubs/pages/ClubDetailPage';
import { AccountVerificationPage } from 'src/modules/auth/pages/AccountVerificationPage';
import { useAuthClient } from 'src/modules/auth/apollo/client';
import { useToast } from '@chakra-ui/react';

export const route = {
  signIn: () => '/',
  signUp: () => '/auth/signUp',
  clubDetail: () => '/club',
  accountVerification: () => '/verify-account/:token',
};

const ProtectedRoute = ({ children }) => {
  const toast = useToast();
  const { user } = useAuthClient();

  if (!user) {
    toast({
      title: 'You must be logged in to access this page',
      status: 'error',
      position: 'top-right',
      duration: 3000,
      isClosable: true,
    });
    return <Navigate to={route.signIn()} replace />;
  }

  return children;
};

const AuthRoute = ({ children }) => {
  const { user } = useAuthClient();

  if (user) {
    return <Navigate to={route.clubDetail()} replace />;
  }

  return children;
};

export function Routes() {
  return (
    <RouterRoutes>
      <Route
        path={route.signIn()}
        element={
          <AuthRoute>
            <SignInPage />
          </AuthRoute>
        }
      />
      <Route
        path={route.signUp()}
        element={
          <AuthRoute>
            <SignUpPage />
          </AuthRoute>
        }
      />
      <Route
        path={route.accountVerification()}
        element={
          <AuthRoute>
            <AccountVerificationPage />
          </AuthRoute>
        }
      />
      <Route
        path={route.clubDetail()}
        element={
          <ProtectedRoute>
            <ClubDetailPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
}
