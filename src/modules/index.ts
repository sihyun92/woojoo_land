import { combineReducers } from "@reduxjs/toolkit";
import loading from "./loading";
import cartItem from "./cartItem";

const rootReducer = combineReducers({
  loading,
  cartItem,
});

export function* rootSaga() {
  yield all([userSaga(), userCheckSaga()]);
}

export default rootReducer;

export type TRootState = ReturnType<typeof rootReducer>;
