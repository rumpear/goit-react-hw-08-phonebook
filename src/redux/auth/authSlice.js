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
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // reducers: {},
  extraReducers: {
    [registerUser.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      // console.log('state.user', state.user);
      // console.log('payload.user', payload.user);
      // console.log('payload', payload);
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
      // state.error = null;
    },
    [loginUser.pending]: (state, { payload }) => {
      state.isLoading = true;
      // state.error = null;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoggedIn = false;
      // state.error = payload;
      state.isLoading = false;
    },
    [logoutUser.fulfilled]: state => {
      state.user = { name: null, email: null };
      state.isLoggedIn = false;
      state.token = null;
    },
    [getCurrentUser.fulfilled]: (state, { payload }) => {
      // console.log(state.user);
      // console.log(payload);
      state.user = payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    [getCurrentUser.pending]: state => {
      state.isLoading = true;
    },
    // [getCurrentUser.rejected]: state => {
    //   state.user = { name: null, email: null };
    //   state.token = null;
    //   state.isLoggedIn = false;
    //   state.isLoading = false;
    // },
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
