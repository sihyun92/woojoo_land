import { combineReducers } from "@reduxjs/toolkit";
import loading from "./loading";

const rootReducer = combineReducers({
  loading,
});

export default rootReducer;

export type TRootState = ReturnType<typeof rootReducer>;
