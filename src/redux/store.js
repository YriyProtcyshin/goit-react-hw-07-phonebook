import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './slicerApi';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: '',
  },
});
