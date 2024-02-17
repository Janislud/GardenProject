import { configureStore } from "@reduxjs/toolkit";
import { dateApi } from "../slices/apiSlice";
import counterReducer from "../slices/counterSlice.js";
import usersReducer from "../slices/usersSlice.js";
import filterReducer from "../slices/filterSlice.js";
import productsReducer from "../slices/productsSlice.js";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    counter: counterReducer,
    [dateApi.reducerPath]: dateApi.reducer,
    products: productsReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dateApi.middleware),
});
