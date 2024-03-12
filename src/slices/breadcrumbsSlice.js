import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  breadcrumbsList: [],
};

export const breadcrumbsSlice = createSlice({
  name: "breadcrumbs",
  initialState,
  reducers: {
    setBreadcrumbs: (state, action) => {
      state.breadcrumbsList = action.payload;
    },
  },
});

export const { setBreadcrumbs } = breadcrumbsSlice.actions;
export default breadcrumbsSlice.reducer;
