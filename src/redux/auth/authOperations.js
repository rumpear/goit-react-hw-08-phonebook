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
      return res;
    } catch (error) {
      console.warn(error.message);
    }
  }
);

export const loginUser = createAsyncThunk('auth/login', async userData => {
  try {
    const res = await login(userData);
    return res;
  } catch (error) {
    console.warn(error.message);
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  try {
    await logout();
  } catch (error) {
    console.warn(error.message);
  }
});

export const getCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const persistedToken = state.auth.token;

      if (!persistedToken) {
        return rejectWithValue();
      }
      token.set(persistedToken);

      // console.log(persistedToken, 'persistedToken');
      // console.log(data, 'data');
      const { data } = await refresh();
      return data;
    } catch (error) {
      // rejectWithValue(error.message);
      console.warn(error.message);
    }
  }
);
