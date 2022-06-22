import { createAsyncThunk } from '@reduxjs/toolkit';
// import { token } from '../../services/authApi';
import {
  createContact,
  deleteContact,
  getContacts,
} from '../../services/contactsApi';

export const fetchContacts = createAsyncThunk(
  'contacts/getContacts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getContacts();
      // console.log(res.token, 'fetchContacts');
      // token.set(res.token);
      return res;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/createContact',
  async (value, { rejectWithValue }) => {
    try {
      const res = await createContact(value);
      // console.log(res.token, 'addContact');
      // token.set(res.token);
      return res;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const removeContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      const res = await deleteContact(id);
      // console.log(res.token, 'deleteContact');
      // token.set(res.token);
      return res;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);
