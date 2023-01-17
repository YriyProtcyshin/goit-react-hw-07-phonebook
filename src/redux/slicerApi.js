import { createSlice } from '@reduxjs/toolkit';

import { fetchAllContacts, addContact } from './operation';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    //------ fetchAllContacts ----------
    [fetchAllContacts.pending](state, action) {
      state.isLoading = true;
    },
    [fetchAllContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchAllContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    //------- addContact ----------------
    [addContact.pending](state, action) {
      state.isLoading = true;
    },
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [addContact.rejected](state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
