import { combineReducers } from "redux";
import {
  contactsApiSlice,
  contactsSlice,
  groupsApiSlice,
} from "./contactsReducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  contacts: contactsSlice.reducer,
  [contactsApiSlice.reducerPath]: contactsApiSlice.reducer,
  /*   [groupsApiSlice.reducerPath]: groupsApiSlice.reducer, */
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      contactsApiSlice.middleware
      /*   groupsApiSlice.middleware */
    ),
});
export type RootState = ReturnType<typeof rootReducer>;
