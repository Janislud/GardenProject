import { configureStore } from "@reduxjs/toolkit";
import { dateApi } from "../slices/apiSlice";
import cartReducer from "../slices/cartSlice.js";
import counterReducer from "../slices/counterSlice.js";
import filterReducer from "../slices/filterSlice.js";
import productsReducer from "../slices/productsSlice.js";
import usersReducer from "../slices/usersSlice.js";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    counter: counterReducer,
    [dateApi.reducerPath]: dateApi.reducer,
    products: productsReducer,
    filter: filterReducer,
    cart:cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dateApi.middleware),
});
