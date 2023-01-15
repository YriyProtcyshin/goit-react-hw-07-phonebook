import { configureStore } from '@reduxjs/toolkit';
import { filterSlicer } from './filterSlicer';

import { setupListeners } from '@reduxjs/toolkit/query';
import { contactsApi } from './contactSlicer';

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter: filterSlicer.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});

setupListeners(store.dispatch);
