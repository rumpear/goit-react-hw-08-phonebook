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
      state.error = payload;
      state.isLoading = false;
    },

    [loginUser.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
    },
    [loginUser.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      state.isLoggedIn = false;
    },

    [logoutUser.fulfilled]: state => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.isLoading = false;
    },

    [getCurrentUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.isLoggedIn = true;
      state.isLoadingCurrentUser = false;
      state.error = null;
    },
    [getCurrentUser.pending]: state => {
      state.isLoadingCurrentUser = true;
      state.error = null;
    },
    [getCurrentUser.rejected]: (state, { payload }) => {
      state.error = payload;
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
