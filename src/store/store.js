import { configureStore } from "@reduxjs/toolkit";
import { dateApi } from "../slices/apiSlice";
import breadcrumbsReducer from "../slices/breadcrumbsSlice.js";
import cartReducer from "../slices/cartSlice.js";
import counterReducer from "../slices/counterSlice.js";
import filterReducer from "../slices/filterSlice.js";
import likedProductsReducer from "../slices/likedProductsSlice.js";
import productsReducer from "../slices/productsSlice.js";
import themeReducer from "../slices/themaSlice.js";
import usersReducer from "../slices/usersSlice.js";
<<<<<<< HEAD
import breadcrumbsReducer from "../slices/breadcrumbsSlice.js";
import modalReducer from "../slices/modalSlice.js"
=======
>>>>>>> 4665f6de3deebfd5d88ee242b2f22ed537323ef8

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    users: usersReducer,
    counter: counterReducer,
    [dateApi.reducerPath]: dateApi.reducer,
    products: productsReducer,
    filter: filterReducer,
    cart: cartReducer,
    likedProducts: likedProductsReducer,
    breadcrumbs: breadcrumbsReducer,
    modal: modalReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dateApi.middleware),
});
