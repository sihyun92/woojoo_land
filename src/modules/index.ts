import { combineReducers } from "@reduxjs/toolkit";
import loading from "./loading";
import auth, { userSaga } from "./auth";
import cartItem from "./cartItem";
import buyItem from "./buyItem";
import user, { userCheckSaga } from "./user";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  loading,
  auth,
  cartItem,
  user,
  buyItem,
});

export function* rootSaga() {
  yield all([userSaga(), userCheckSaga()]);
}

export default rootReducer;

export type TRootState = ReturnType<typeof rootReducer>;
