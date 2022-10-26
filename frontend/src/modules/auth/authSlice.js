import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
    },
    signOut() {
      return initialState;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectUser = createSelector(selectAuth, (state) => state.user);
export const selectToken = createSelector(selectAuth, (state) => state.token);

export default authSlice.reducer;
