import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/usersSlice.js";
import { dateApi } from "../slices/apiSlice";
import productsReducer from '../slices/productsSlice.js'

export const store = configureStore({
    reducer: {
        users: usersReducer,
        [dateApi.reducerPath]: dateApi.reducer,
        products: productsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dateApi.middleware),
})