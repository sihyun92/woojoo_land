import { combineReducers } from "@reduxjs/toolkit";
import loading from "./loading";
import auth, { userSaga } from "./auth";
import cartItem from "./cartItem";
import payment from "./payment";
import user, { userCheckSaga } from "./user";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  loading,
  auth,
  cartItem,
  user,
  payment,
});

export function* rootSaga() {
  yield all([userSaga(), userCheckSaga()]);
}

export default rootReducer;

export type TRootState = ReturnType<typeof rootReducer>;
