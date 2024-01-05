import { combineReducers, createStore } from "redux";
import { contactsReducer } from "./contactsReducer";

const rootReducer = combineReducers({
  contacts: contactsReducer,
});
/*  */
export const store = createStore(rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
