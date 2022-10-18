import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { PageWrapper, NotFoundPage } from 'src/shared/navigation';

import { SignInPage, SignUpPage } from 'src/modules/auth';
import { HomePage, UserDetailPage } from 'src/modules/quack';
import {
  AboutPage,
  Practical01Page,
  Practical02Page,
  Practical03Page,
} from 'src/modules/static-pages';

export const route = {
  home: () => `/`,
  practical: (id) => `/practical/${id}`,
  about: () => `/about`,
  signIn: () => `/auth/signin`,
  signUp: () => `/auth/signup`,
  userDetail: (userName) => `/${userName}`,
};

export const PRACTICALS = [
  // Practical pages
  { id: '01', PageComponent: Practical01Page },
  { id: '02', PageComponent: Practical02Page },
  {
    id: '03',
    PageComponent: Practical03Page,
    wrapperProps: {
      maxW: '80rem',
      minW: 'none',
      w: '100%',
    },
  },
];

export function Routes() {
  return (
    <RouterRoutes>
      <Route path={route.home()} element={<HomePage />} />
      {PRACTICALS.map(({ id, PageComponent, wrapperProps = {} }) => (
        <Route
          path={route.practical(id)}
          key={id}
          element={
            <PageWrapper {...wrapperProps}>
              <PageComponent />
            </PageWrapper>
          }
        />
      ))}
      <Route path={route.about()} element={<AboutPage />} />
      <Route path={route.signIn()} element={<SignInPage />} />
      <Route path={route.signUp()} element={<SignUpPage />} />
      <Route
        path={route.userDetail(':userName')}
        element={<UserDetailPage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
}
