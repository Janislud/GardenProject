import { configureStore } from "@reduxjs/toolkit";
import { dateApi } from "../slices/apiSlice";
import usersReducer from "../slices/usersSlice.js";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [dateApi.reducerPath]: dateApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dateApi.middleware),
});
