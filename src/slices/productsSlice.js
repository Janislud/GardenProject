import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isFetching: false,
  error: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    startFetching: (state) => {
      state.isFetching = true;
      state.error = "";
    },
    productsLoaded: (state, action) => {
      state.isFetching = false; 
      state.products = action.payload?.length ? action.payload : [];
    },
    productsLoadFailed: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    productsLoadedWithDiscount: (state,action) => {
      state.isFetching = true;
      state.products = action.payload?.length ? action.payload.filter((product) => product.discont_price) : [];
    }
  },
});
export const { startFetching, productsLoadFailed, productsLoaded, productsLoadedWithDiscount } =
  productsSlice.actions;
export default productsSlice.reducer;