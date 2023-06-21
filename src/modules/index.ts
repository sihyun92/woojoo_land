import { combineReducers } from "@reduxjs/toolkit";
import loading from "./loading";
import auth from "./auth";

const rootReducer = combineReducers({
  loading,
  auth,
});

export default rootReducer;

export type TRootState = ReturnType<typeof rootReducer>;
