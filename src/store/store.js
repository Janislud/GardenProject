import { configureStore } from "@reduxjs/toolkit";
import { dateApi } from "../slices/apiSlice";
import breadcrumbsReducer from "../slices/breadcrumbsSlice.js";
import cartReducer from "../slices/cartSlice.js";
import filterReducer from "../slices/filterSlice.js";
import likedProductsReducer from "../slices/likedProductsSlice.js";
import productsReducer from "../slices/productsSlice.js";
import themeReducer from "../slices/themaSlice.js";
import usersReducer from "../slices/usersSlice.js";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    users: usersReducer,
    [dateApi.reducerPath]: dateApi.reducer,
    products: productsReducer,
    filter: filterReducer,
    cart: cartReducer,
    likedProducts: likedProductsReducer,
    breadcrumbs: breadcrumbsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dateApi.middleware),
});
