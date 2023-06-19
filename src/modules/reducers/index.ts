// Combine all reducers

import { combineReducers } from "redux";
import sample from "./sample";

const rootReducer = combineReducers({
  sample: sample,
});

export default rootReducer;
