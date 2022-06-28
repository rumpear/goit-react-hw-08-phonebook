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
  async (userData, { rejectWithValue }) => {
    try {
      const res = await register(userData);
      token.set(res.token);
      return res;
    } catch (error) {
      console.warn(error);
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await login(userData);
      token.set(res.token);
      return res;
    } catch (error) {
      console.warn(error);
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logout();
      token.unset();
    } catch (error) {
      console.warn(error.message);
      return rejectWithValue();
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return rejectWithValue();
    }
    token.set(persistedToken);

    try {
      const { data } = await refresh();
      return data;
    } catch (error) {
      console.warn(error);
      return rejectWithValue();
    }
  }
);
