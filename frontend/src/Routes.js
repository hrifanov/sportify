import { Route, Routes as RouterRoutes } from 'react-router-dom';
import { NotFoundPage } from 'src/shared/navigation/pages/NotFoundPage';
import { SignInPage, SignUpPage } from 'src/modules/auth';
import AppLayout from './shared/core/organisms/AppLayout';
import ClubDetailPage from './modules/clubs/pages/ClubDetailPage';

export const route = {
  signIn: () => `/`,
  signUp: () => `/auth/signUp`,
  clubDetail: () => `/club`,
};

const useLayout = (Component) => <AppLayout>{Component}</AppLayout>;

export function Routes() {
  return (
    <RouterRoutes>
      <Route path={route.signIn()} element={useLayout(<SignInPage />)} />
      <Route path={route.signUp()} element={useLayout(<SignUpPage />)} />
      <Route
        path={route.clubDetail()}
        element={useLayout(<ClubDetailPage />)}
      />
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
}
