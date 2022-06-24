import { createAsyncThunk } from '@reduxjs/toolkit';
// import {
//   createContact,
//   deleteContact,
//   getContacts,
// } from '../../services/contactsAPI';
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
      await deleteContact(id);
      return id;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);
