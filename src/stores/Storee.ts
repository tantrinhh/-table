import { combineReducers } from "@reduxjs/toolkit";
import tableReducer from "./TableSlice";

const rootReducer = combineReducers({
  table: tableReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
