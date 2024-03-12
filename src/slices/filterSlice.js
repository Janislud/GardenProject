import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  minPrice: "",
  maxPrice: "",
  sort: "",
  showOnlyDiscounted: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    minPriceChange: (state, action) => {
      return { ...state, minPrice: action.payload };
    },
    maxPriceChange: (state, action) => {
      return { ...state, maxPrice: action.payload };
    },
    sortChange: (state, action) => {
      return { ...state, sort: action.payload };
    },
    toggleShowOnlyDiscounted: (state) => {
      return {
        ...state,
        showOnlyDiscounted: !state.showOnlyDiscounted,
      };
    },
    resetFilters: () => {
      return initialState; // Возвращаем начальное состояние фильтров
    },
  },
});

export const {
  maxPriceChange,
  minPriceChange,
  sortChange,
  toggleShowOnlyDiscounted,
  resetFilters, // Добавляем resetFilters к экспорту
} = filterSlice.actions;

export default filterSlice.reducer;
