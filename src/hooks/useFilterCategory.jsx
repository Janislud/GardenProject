export function filterProducts(products, { minPrice, maxPrice, sort, showOnlyDiscounted }) {
  let filteredProducts = [...products];

   if (showOnlyDiscounted) {
                filteredProducts = filteredProducts.filter((product) => product.discont_price);
    }

  filteredProducts = filteredProducts.filter(
    (product) =>
      (!minPrice || product.price >= Number(minPrice)) &&
      (!maxPrice || product.price <= Number(maxPrice))
  );

  if (sort && sort !== "" && sort !== "by default") {
    filteredProducts.sort((a, b) => {
      return sort === "Ascending" ? b.price - a.price : a.price - b.price;
    });
  }

  return filteredProducts;
}
