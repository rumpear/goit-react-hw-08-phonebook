import { createSlice } from '@reduxjs/toolkit';
import { addContact, fetchContacts, removeContact } from './contactsOperations';

const initialState = {
  entities: [],
  filter: '',
  isLoading: false,
  error: null,
};

export const contactsAsyncSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    updateFilter(state, { payload }) {
      return { ...state, filter: payload };
    },
  },
  extraReducers: {
    [fetchContacts.fulfilled]: (state, { payload }) => {
      state.entities = [...payload];
      state.isLoading = false;
    },
    [fetchContacts.pending]: state => {
      state.isLoading = true;
    },
    [fetchContacts.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },

    [addContact.fulfilled]: (state, { payload }) => {
      state.entities = [...state.entities, payload];
      state.isLoading = false;
    },
    [addContact.pending]: state => {
      state.isLoading = true;
    },
    [addContact.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },

    [removeContact.fulfilled]: (state, { payload }) => {
      state.entities = state.entities.filter(({ id }) => {
        return id !== payload;
      });
      state.isLoading = false;
    },
    [removeContact.pending]: state => {
      state.isLoading = true;
    },
    [removeContact.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export const { updateFilter } = contactsAsyncSlice.actions;
