import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedProducts: [],
  likedIcons: [], // Этот массив можно удалить, если он не используется
  likeTotalQuantity: 0,
};

const likedProductsSlice = createSlice({
  name: "likedProducts",
  initialState,
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
    },
    deleteFromLikedProducts(state, action) {
      const productId = action.payload.id;

      // Удаляем весь товар с заданным идентификатором из страницы любимых товаров
      state.likedProducts = state.likedProducts.filter(
        (product) => product.id !== productId
      );
      state.likeTotalQuantity--;
    },
    toggleLikedStatus(state, action) {
      const productId = action.payload.id;
      const existingProduct = state.likedProducts.find(
        (product) => product.id === productId
      );

      if (existingProduct) {
        existingProduct.isLiked = !existingProduct.isLiked;
      }
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
