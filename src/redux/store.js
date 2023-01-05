import { configureStore } from "@reduxjs/toolkit";
import { contactSlicer } from "./contactSlicer";
import { filterSlicer } from "./filterSlicer";


export const store = configureStore({
  reducer: {
    contacts: contactSlicer.reducer,  
    filter: filterSlicer.reducer
  },
});