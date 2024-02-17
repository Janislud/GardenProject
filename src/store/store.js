import { configureStore } from "@reduxjs/toolkit";
import { dateApi } from "../slices/apiSlice";
import counterReducer from "../slices/counterSlice.js";
import usersReducer from "../slices/usersSlice.js";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    counter: counterReducer,
    [dateApi.reducerPath]: dateApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dateApi.middleware),
});
