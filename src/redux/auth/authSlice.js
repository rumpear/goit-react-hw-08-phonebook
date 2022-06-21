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
      console.log('state.user', state.user);
      console.log('payload.user', payload.user);
      console.log('payload', payload);
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    [logoutUser.fulfilled]: state => {
      state.isLoggedIn = false;
      state.token = null;
    },
    [getCurrentUser.fulfilled]: (state, { payload }) => {
      console.log(state.user);
      console.log(payload);
      state.user = payload.user;
      state.isLoggedIn = true;
    },
    [getCurrentUser.rejected]: state => {
      // state.user = { name: null, email: null };
      // state.token = null;
      // state.isLoggedIn = false;
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
