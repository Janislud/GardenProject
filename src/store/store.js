import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/usersSlice.js";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
