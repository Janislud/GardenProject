import { configureStore } from "@reduxjs/toolkit";
import { dateApi } from "../slices/apiSlice";


export const store = configureStore({
    reducer: {
        [dateApi.reducerPath]: dateApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dateApi.middleware),
})

