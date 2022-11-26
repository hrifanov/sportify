import { Route, Routes as RouterRoutes, Navigate } from 'react-router-dom';
import { NotFoundPage } from 'src/shared/navigation/pages/NotFoundPage';
import { SignInPage, SignUpPage } from 'src/modules/auth';
import ClubDetailPage from './modules/clubs/pages/ClubDetailPage';
import DashboardPage from './modules/clubs/pages/DashboardPage';
import NewClubPage from './modules/clubs/pages/NewClubPage';
import CreateMatchPage from './modules/matches/pages/CreateMatchPage';
import ClubEditPage from './modules/clubs/pages/ClubEditPage';
import { AccountVerificationPage } from 'src/modules/auth/pages/AccountVerificationPage';
import { AcceptInvitePage } from 'src/modules/clubs/pages/AcceptInvitePage';
import { useAuthClient } from 'src/modules/auth/apollo/client';
import { useToast } from '@chakra-ui/react';
import { InteractiveMatchPage } from './modules/matches/pages/InteractiveMatchPage.js';
import { MatchDetailPage } from './modules/matches/pages/MatchDetailPage.js';

export const route = {
  signIn: () => '/',
  signUp: () => '/auth/signUp',
  clubDetail: (id = ':id') => `/club/${id}`,
  clubEdit: (id = ':id') => `/club/${id}/edit`,
  createMatch: () => '/match/create',
  matches: () => '/matches',
  matchCreate: () => '/match/create',
  matchDetail: (id = ':id') => `/matches/${id}`,
  matchEdit: (id) => `/matches/${id}/edit`,
  matchInteractive: () => '/match/interactive',
  accountVerification: () => '/verify-account/:token',
  acceptInvite: (token) => {
    if (token) {
      return '/accept-invite/' + token;
    }
    return '/accept-invite/:token';
  },
  dashboard: () => '/dashboard',
  newClub: () => '/new-club',
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
    return <Navigate to={route.dashboard()} replace />;
  }

  return children;
};

export function Routes() {
  const { user } = useAuthClient();
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
      <Route
        path={route.matchCreate()}
        element={
          <ProtectedRoute>
            <CreateMatchPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={route.matchInteractive()}
        element={
          <ProtectedRoute>
            <InteractiveMatchPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={route.matchDetail()}
        element={
          <ProtectedRoute>
            <MatchDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={route.clubEdit()}
        element={
          <ProtectedRoute>
            <ClubEditPage />
          </ProtectedRoute>
        }
      />
      <Route path={route.acceptInvite()} element={<AcceptInvitePage />} />
      <Route
        path={route.dashboard()}
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={route.newClub()}
        element={
          <ProtectedRoute>
            <NewClubPage user={user} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
}
