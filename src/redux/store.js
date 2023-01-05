import { configureStore } from "@reduxjs/toolkit";
import { filterSlicer } from "./filterSlicer";
import { contactSlicerPersistedReducer } from "./contactSlicer";
import {
  persistStore,  
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';


export const store = configureStore({
  reducer: {
    contacts: contactSlicerPersistedReducer,
    filter: filterSlicer.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);