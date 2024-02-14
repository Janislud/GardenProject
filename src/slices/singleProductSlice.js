import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**создаем астихронный thunk для получения данных о единичном продукте */
export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/fetchSingleProduct",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`http://127.0.0.1:3333/products/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**создаем исходное состояние для слайса */
const initialSlice = {
  data: null,
  loading: false,
  error: null,
};

/**создаем слайс с именем singleProduct */
const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default singleProductSlice.reducer;
