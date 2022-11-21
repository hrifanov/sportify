import { makeVar, useReactiveVar } from '@apollo/client';
import { makeLocalStorageItem } from 'src/utils/storage';
import { useNavigate } from 'react-router-dom';

const LOCAL_STORAGE_AUTH_KEY = 'auth';
const persistedAuth = makeLocalStorageItem(LOCAL_STORAGE_AUTH_KEY);

const getInitialState = () => {
  const { user, accessToken } = persistedAuth() ?? {};

  return {
    user,
    accessToken,
  };
};

export const auth = makeVar(getInitialState());

export const signIn = ({ user, accessToken }) => {
  auth({
    user,
    accessToken,
  });
};

export const signOut = () => {
  auth({
    user: null,
    accessToken: null,
  });
};

const persistAuth = () => {
  persistedAuth(auth());
};

const onNextChange = () => {
  persistAuth();
  auth.onNextChange(onNextChange);
};

auth.onNextChange(onNextChange);

export const useAuthClient = () => {
  const navigate = useNavigate();
  const authState = useReactiveVar(auth);
  return {
    user: authState.user,
    accessToken: authState.accessToken,
    signOut: () => {
      signOut();
      navigate('/');
    },
  };
};
