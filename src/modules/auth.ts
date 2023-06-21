import produce from "immer";
import { ActionType, createAction, createReducer } from "typesafe-actions";

const CHANGE_FIELD = "auth/CHANGE_FIELD" as const;
const INITIALIZE_FORM = "auth/INITIALIZE_FORM" as const;

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  }),
)();

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form)();

const actions = { changeField, initializeForm };
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
};

const auth = createReducer<TAuthState, TAuthAction>(initialState, {
  [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
    produce(state, (draft) => {
      draft[form][key] = value;
    }),
  [INITIALIZE_FORM]: (state, { payload: form }) => ({
    ...state,
    [form]: initialState[form],
  }),
});

export default auth;
