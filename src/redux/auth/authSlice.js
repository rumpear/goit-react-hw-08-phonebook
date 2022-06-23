import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from './authOperations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  isLoadingCurrentUser: false,
  error: null,
  status: 'idle',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [registerUser.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
      state.error = null;
    },
    [registerUser.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [registerUser.rejected]: (state, { payload }) => {
      console.log(payload);
      state.error = payload;
    },

    [loginUser.fulfilled]: (state, { payload }) => {
      // console.log('state.user', state.user);
      // console.log('payload.user', payload.user);
      // console.log('payload', payload);
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
    },
    [loginUser.pending]: (state, { payload }) => {
      state.isLoading = true;
      state.error = null;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoggedIn = false;
      state.error = payload;
      state.isLoading = false;
    },

    [logoutUser.fulfilled]: state => {
      state.user = { name: null, email: null };
      state.isLoggedIn = false;
      state.token = null;
    },

    [getCurrentUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.isLoggedIn = true;
      state.isLoadingCurrentUser = false;
    },
    [getCurrentUser.pending]: state => {
      state.isLoadingCurrentUser = true;
    },
    [getCurrentUser.rejected]: state => {
      state.isLoadingCurrentUser = false;
    },
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const persistedAuthReducer = persistReducer(
  persistConfig,
  authSlice.reducer
);
