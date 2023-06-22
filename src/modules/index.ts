import { combineReducers } from "@reduxjs/toolkit";
import loading from "./loading";
import auth, { userSaga } from "./auth";
import cartItem from "./cartItem";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  loading,
  cartItem,
});

export function* rootSaga() {
  yield all([userSaga()]);
}

export default rootReducer;

export type TRootState = ReturnType<typeof rootReducer>;
