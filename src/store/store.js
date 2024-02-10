import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/usersSlice.js";
import { dateApi } from "../slices/apiSlice";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        [dateApi.reducerPath]: dateApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dateApi.middleware),
})