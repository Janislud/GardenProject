import { configureStore } from "@reduxjs/toolkit";
import { dateApi } from "../slices/apiSlice";
import filterReducer from "../slices/filterSlice.js";
import usersReducer from "../slices/usersSlice.js";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        filter:filterReducer,
        [dateApi.reducerPath]: dateApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dateApi.middleware),
})