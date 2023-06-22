import produce from "immer";
import { ActionType, createAction, createReducer } from "typesafe-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as userAPI from "../lib/API/userAPI";
import { takeLatest } from "@redux-saga/core/effects";

const CHANGE_FIELD = "auth/CHANGE_FIELD" as const;
const INITIALIZE_FORM = "auth/INITIALIZE_FORM" as const;

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes("auth/REGISTER");
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes("auth/LOGIN");

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  }),
)();
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form)();
export const register = createAction(REGISTER, ({ email, password, passwordConfirm }) => ({
  email,
  password,
  passwordConfirm,
}))();
export const login = createAction(REGISTER, ({ email, password }) => ({
  email,
  password,
}))();

// 사가 생성
const registerSaga = createRequestSaga(REGISTER, userAPI.register);
const loginSaga = createRequestSaga(LOGIN, userAPI.login);

export function* userSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const actions = { changeField, initializeForm, register, login };
type TAuthAction = ActionType<typeof actions>;
type TAuthState = {
  [props: string]: any;
};

const initialState: TAuthState = {
  register: {
    email: "",
    password: "",
    passwordConfirm: "",
  },
  login: {
    email: "",
    password: "",
  },
  auth: null,
  authError: null,
};

const auth = createReducer<TAuthState, TAuthAction>(initialState, {
  [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
    produce(state, (draft) => {
      draft[form][key] = value;
    }),
  [INITIALIZE_FORM]: (state, { payload: form }) => ({
    ...state,
    [form]: initialState[form],
    authError: null,
  }),
  [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
    ...state,
    authError: null,
    auth,
  }),
  [REGISTER_FAILURE]: (state, { payload: error }) => ({
    ...state,
    authError: error,
  }),
  [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
    ...state,
    authError: null,
    auth,
  }),
  [LOGIN_FAILURE]: (state, { payload: error }) => ({
    ...state,
    authError: error,
  }),
});

export default auth;