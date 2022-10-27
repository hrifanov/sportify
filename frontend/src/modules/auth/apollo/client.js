import { makeVar, useReactiveVar } from '@apollo/client';
import { makeSessionStorageItem } from 'src/utils/storage';

const LOCAL_STORAGE_AUTH_KEY = 'auth-token';
const persistedAuth = makeSessionStorageItem(LOCAL_STORAGE_AUTH_KEY);

const initialState = persistedAuth() ?? {
  user: null,
  token: null,
};
export const auth = makeVar(initialState);

export const signIn = ({ user, token }) => {
  auth({
    user,
    token,
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
  return useReactiveVar(auth);
};

window.signIn = signIn;
window.signOut = signOut;
window.auth = () => auth();
