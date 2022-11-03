import { Route, Routes as RouterRoutes } from 'react-router-dom';
import { NotFoundPage } from 'src/shared/navigation/pages/NotFoundPage';
import { SignInPage, SignUpPage } from 'src/modules/auth';
import AppLayout from './shared/core/organisms/AppLayout';
import ClubDetailPage from './modules/clubs/pages/ClubDetailPage';
import { AccountVerification } from 'src/modules/auth/pages/AccountVerification';

export const route = {
  signIn: () => '/',
  signUp: () => '/auth/signUp',
  clubDetail: () => '/club',
  accountVerification: () => '/verify-account/:token',
};

const useLayout = (Component) => <AppLayout>{Component}</AppLayout>;

export function Routes() {
  return (
    <RouterRoutes>
      <Route path={route.signIn()} element={useLayout(<SignInPage />)} />
      <Route path={route.signUp()} element={useLayout(<SignUpPage />)} />
      <Route path={route.clubDetail()} element={useLayout(<ClubDetailPage />)} />
      <Route path={route.accountVerification()} element={useLayout(<AccountVerification />)} />
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
}
