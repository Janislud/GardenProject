import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // добавляем массив для хранения товаров в корзине
  totalCount: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const existingProductIndex = state.products.findIndex(product => product.id === action.payload.id);
      
      if (existingProductIndex !== -1) {
        // Если товар уже есть в корзине, увеличиваем его количество
        state.products[existingProductIndex].count += 1;
      } else {
        // Если товара еще нет в корзине, добавляем его
        state.products.push({ ...action.payload, count: 1 });
      }
      
      // Увеличиваем общее количество товаров в корзине
      state.totalCount += action.payload.price;
    },

    dropProductFromCart: (state, action) => {
      const existingProductIndex = state.products.findIndex(product => product.id === action.payload.id);
      
      if (existingProductIndex !== -1) {
        const existingProduct = state.products[existingProductIndex];
        
        if (existingProduct.count > 1) {
          // Уменьшаем количество товара в корзине
          existingProduct.count -= 1;
        } else {
          // Если количество товара равно 1, удаляем его из корзины
          state.products.splice(existingProductIndex, 1);
        }
        
        // Уменьшаем общее количество товаров в корзине
        state.totalCount -= action.payload.price;
      }
    }
  }
});

export const { addProductToCart, dropProductFromCart } = cartSlice.actions
export default cartSlice.reducer;