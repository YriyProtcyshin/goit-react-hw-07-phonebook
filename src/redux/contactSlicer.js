import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const initialContacts = [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
]

export const contactSlicer = createSlice({
  name: 'contacts',
  initialState: { contacts: initialContacts },
  reducers: {
    addContact(state, action) {
      const payload = action.payload;
      if (state.contacts.find(contacts => contacts.name === payload.name)) {
        Notify.failure(`${payload.name} is alredy in contacts`);
        return 
      }
        state.contacts.push(payload);
    },
    removeContact(state, action) {
      const newContacts = state.contacts.filter(
        item => item.id !== action.payload
      );
      return { contacts: newContacts };
    },
  },
});

// Persist
const persistConfig = {
  key: 'root',
  storage,
};

export const contactSlicerPersistedReducer = persistReducer(
  persistConfig,
  contactSlicer.reducer
);