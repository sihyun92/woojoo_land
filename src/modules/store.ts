// redux store

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    sample: {
      test: true,
    },
  },
});

export default store;
