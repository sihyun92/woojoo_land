import { combineReducers } from "@reduxjs/toolkit";
import loading from "./loading";
import auth from "./auth";
import cartItem from "./cartItem";

const rootReducer = combineReducers({
  loading,
  auth,
  cartItem,
});

export default rootReducer;

export type TRootState = ReturnType<typeof rootReducer>;
