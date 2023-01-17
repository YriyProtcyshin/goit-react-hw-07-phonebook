import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './slicerApi';
import { filterSlicer } from './filterSlicer';

export const store = configureStore({
  reducer: {
    filters: filterSlicer.reducer,
    contacts: contactsReducer,
  },
});
