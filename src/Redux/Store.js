import { combineReducers, createStore } from "redux";
import contactReducer from "./Reducer";
const rootReducer = combineReducers({ Reducer: contactReducer });
const store = createStore(rootReducer);
export default store;
