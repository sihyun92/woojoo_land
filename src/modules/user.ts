import { ActionType, createAction, createReducer } from "typesafe-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as userAPI from "../lib/api/userAPI";
import { takeLatest } from "redux-saga/effects";

const TEMP_SET_USER = "user/TEMP_SET_USER" as const;

const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
  createRequestActionTypes("user/CHECK");

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user)();
export const check = createAction(CHECK)();

const actions = { tempSetUser, check };
type TUserAction = ActionType<typeof actions>;
type TUserState = {
  user: null;
  checkError: null;
};

const checkSaga = createRequestSaga(CHECK, userAPI.check);
export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
}

const initialState: TUserState = {
  user: null,
  checkError: null,
};

const user = createReducer<TUserState, TUserAction>(initialState, {
  [TEMP_SET_USER]: (state, { payload: user }) => ({
    ...state,
    user,
  }),
  [CHECK_SUCCESS]: (state, { payload: user }) => ({
    ...state,
    user,
    checkError: null,
  }),
  [CHECK_FAILURE]: (state, { payload: error }) => ({
    ...state,
    user: null,
    checkError: error,
  }),
});

export default user;
