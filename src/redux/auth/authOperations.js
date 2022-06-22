import {
  register,
  login,
  logout,
  refresh,
  token,
} from '../../services/authApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  'auth/register',
  async userData => {
    try {
      const res = await register(userData);
      console.log('res.token', res.token);
      token.set(res.token);
      return res;
    } catch (error) {
      console.warn(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await login(userData);
      token.set(res.token);
      console.log('res.token', res.token);
      return res;
    } catch (error) {
      // console.warn(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  try {
    await logout();
    token.unset();
  } catch (error) {
    console.warn(error.message);
  }
});

export const getCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return rejectWithValue();
    }
    token.set(persistedToken);
    console.log('persistedToken', persistedToken);

    try {
      const { data } = await refresh();
      return data;
    } catch (error) {
      console.warn(error.message);
    }
  }
);
