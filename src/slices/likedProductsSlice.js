import { createSlice } from "@reduxjs/toolkit";

// Загрузка избранных товаров из localStorage или инициализация начального состояния
const savedLikedProducts = JSON.parse(
  localStorage.getItem("likedProducts")
) || {
  likedProducts: [],
  likeTotalQuantity: 0,
};

const likedProductsSlice = createSlice({
  name: "likedProducts",
  initialState: savedLikedProducts,
  reducers: {
    addToLikedProducts(state, action) {
      const existingIndex = state.likedProducts.findIndex(
        (product) => product.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.likedProducts[existingIndex].likeQuantity += 1;
        state.likeTotalQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, likeQuantity: 1 };
        state.likedProducts.push(tempProduct);
        state.likeTotalQuantity += 1;
      }
      localStorage.setItem('likedProducts', JSON.stringify(state));
    },

    deleteFromLikedProducts(state, action) {
      const productId = action.payload.id;
      // Проверяем, присутствует ли товар в списке избранных
      const existingProductIndex = state.likedProducts.findIndex(
        (product) => product.id === productId
      );
      if (existingProductIndex !== -1) {
        // Если товар присутствует, удаляем его
        state.likedProducts.splice(existingProductIndex, 1);
        state.likeTotalQuantity--;
      }
      localStorage.setItem('likedProducts', JSON.stringify(state));
    },

    toggleLikedStatus(state, action) {
      const productId = action.payload.id;
      const existingProduct = state.likedProducts.find(
        (product) => product.id === productId
      );

      if (existingProduct) {
        existingProduct.isLiked = !existingProduct.isLiked;
      }
      localStorage.setItem('likedProducts', JSON.stringify(state));
    },
    getLikedProductsQuantity(state) {
      const { likedProducts } = state;
      const uniqueIds = [];
      likedProducts.forEach((product) => {
        if (!uniqueIds.includes(product.id)) {
          uniqueIds.push(product.id);
        }
      });

      const quantity = uniqueIds.length;
      state.likeTotalQuantity = quantity;
    },
  },
});

export const {
  addToLikedProducts,
  deleteFromLikedProducts,
  toggleLikedStatus,
  getLikedProductsQuantity,
} = likedProductsSlice.actions;
export default likedProductsSlice.reducer;
