import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const contactSlicer = createSlice({
  name: 'contacts',
  initialState: { contacts: initialContacts },
  reducers: {
    addContact(state, { payload }) {
      state.contacts.push(payload);
    },
    removeContact(state, { payload }) {
      const newContacts = state.contacts.filter(item => item.id !== payload);
      return { contacts: newContacts };
    },
  },
});

export const { addContact, removeContact } = contactSlicer.actions;

// Persist
const persistConfig = {
  key: 'root',
  storage,
};

export const contactSlicerPersistedReducer = persistReducer(
  persistConfig,
  contactSlicer.reducer
);
