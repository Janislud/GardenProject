export const getProducts = (state, isDiscount) => {
  if (!state.products || !Array.isArray(state.products)) {
    return [];
  }
  return isDiscount
    ? state.products.filter((product) => product.discount)
    : state.products;
};
