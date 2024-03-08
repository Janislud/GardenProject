import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  const savedCartData = localStorage.getItem('cart');
  if (savedCartData) {
    try {
      return JSON.parse(savedCartData);
    } catch (error) {
      console.error('Parsing error on cart data from localStorage', error);
    }
  }
  return {
    products: [],
    totalCount: 0,
    totalQuantity: 0,
  };
};

const initialState = getInitialState();

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
  if (action.payload.discont_price) {
    // Если у товара есть скидочная цена, учитываем её при вычислении общей стоимости
    state.totalCount += action.payload.discont_price * action.payload.quantity;
  } else {
    // Если скидочной цены нет, используем обычную цену
    state.totalCount += action.payload.price * action.payload.quantity;
  }
  localStorage.setItem('cart', JSON.stringify(state));
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
    state.totalQuantity -= 1;

    // Обновляем общую стоимость корзины
    if (existingProduct.discont_price) {
      // Если есть скидочная цена, уменьшаем общую стоимость на скидочную цену
      state.totalCount -= existingProduct.discont_price;
    } else {
      // Иначе уменьшаем общую стоимость на обычную цену
      state.totalCount -= existingProduct.price;
    }
  }
  localStorage.setItem('cart', JSON.stringify(state));
},
    
    cleanCart: (state) => {
         state.products = [];
          state.totalCount = 0;
            state.totalQuantity = state.products.reduce((acc, product) => acc + product.count, 0);
    },

 dropOneProductFromCart: (state, action) => {
    const productId = action.payload.id;
    const existingProductIndex = state.products.findIndex(product => product.id === productId);

    if (existingProductIndex !== -1) {
        const existingProduct = state.products[existingProductIndex];
        const totalPriceToRemove = existingProduct.discont_price ? existingProduct.discont_price * existingProduct.count : existingProduct.price * existingProduct.count;

        // Уменьшаем общую стоимость корзины на стоимость удаляемого товара
        state.totalCount -= totalPriceToRemove;

        // Удаляем весь товар с заданным идентификатором из корзины
        state.products = state.products.filter(product => product.id !== productId);

        // Уменьшаем общее количество товаров в корзине
        state.totalQuantity -= existingProduct.count;
    }
    localStorage.setItem('cart', JSON.stringify(state));
},
  }
});

export const { addProductToCart, dropProductFromCart, cleanCart, dropOneProductFromCart } = cartSlice.actions
export default cartSlice.reducer;