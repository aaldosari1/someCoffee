import { combineReducers, createStore } from "redux";
import userReducer from "./user/reducer";
import itemReducer from "./items/reducer";

const reduces = combineReducers({ userReducer, itemReducer });
const store = createStore(reduces);

export default store;
