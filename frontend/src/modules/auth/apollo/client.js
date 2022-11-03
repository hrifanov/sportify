import { makeVar, useReactiveVar } from '@apollo/client';
import { makeSessionStorageItem } from 'src/utils/storage';
import { useNavigate } from 'react-router-dom';

const LOCAL_STORAGE_AUTH_KEY = 'auth-token';
const persistedAuth = makeSessionStorageItem(LOCAL_STORAGE_AUTH_KEY);

const initialState = persistedAuth() ?? {
  user: null,
  token: null,
};
export const auth = makeVar(initialState);

export const signIn = ({ user, accessToken }) => {
  auth({
    user,
    accessToken,
  });
};

export const signOut = () => {
  auth({
    user: null,
    token: null,
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
    signOut: () => {
      signOut();
      navigate('/');
    },
  };
};
