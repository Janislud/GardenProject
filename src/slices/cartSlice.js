import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // добавляем массив для хранения товаров в корзине
  totalCount: 0,
  totalQuantity: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const existingProductIndex = state.products.findIndex(product => product.id === action.payload.id);
      
      if (existingProductIndex !== -1) {
        // Если товар уже есть в корзине, увеличиваем его количество
        state.products[existingProductIndex].count += action.payload.quantity;
      } else {
        // Если товара еще нет в корзине, добавляем его
        state.products.push({ ...action.payload, count: action.payload.quantity });
      }
      // Обновляем общее количество товаров в корзине
      state.totalQuantity += action.payload.quantity;

      // Обновляем общую стоимость корзины
      state.totalCount += action.payload.price * action.payload.quantity;
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

        // Уменьшаем общее колво товаров
        state.totalQuantity -=1;
      }
    },
    
    cleanCart: (state) => {
         state.products = [];
          state.totalCount = 0;
            state.totalQuantity = state.products.reduce((acc, product) => acc + product.count, 0);
    },

    dropOneProductFromCart : (state, action) => {
 
      const productId = action.payload.id;
      const existingProductIndex = state.products.findIndex(product => product.id === productId);

      if (existingProductIndex !== -1) {
      const existingProduct = state.products[existingProductIndex];
      const totalPriceToRemove = existingProduct.price * existingProduct.count;

      // Уменьшаем общее количество товаров в корзине на стоимость удаляемого товара
      state.totalCount -= totalPriceToRemove;

      // Удаляем весь товар с заданным идентификатором из корзины
      state.products = state.products.filter(product => product.id !== productId);

      // Уменьшаем обшее кол во товаров в корзине
      state.totalQuantity -= existingProduct.count
    }
  },
  }
});

export const { addProductToCart, dropProductFromCart, cleanCart, dropOneProductFromCart } = cartSlice.actions
export default cartSlice.reducer;