import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useFilterFavorits = (products) => {
  const { minPrice, maxPrice, sort, showOnlyDiscounted } = useSelector(
    (state) => state.filter
  );
  const [filteredData, setFilteredData] = useState([]);

  // Функция фильтрации данных
  const filterData = (products) => {
    let filteredProducts = products;

    filteredProducts = filteredProducts.filter(
      (product) =>
        (!minPrice || product.discont_price >= Number(minPrice)) &&
        (!maxPrice || product.discont_price <= Number(maxPrice))
    );

    if (showOnlyDiscounted) {
      filteredProducts = filteredProducts.filter(
        (product) => product.discont_price
      );
    }

    const sortedProducts =
      sort === "" || sort === "by default"
        ? filteredProducts
        : filteredProducts.sort((a, b) => {
            return sort === "Ascending"
              ? b.discont_price - a.discont_price
              : a.discont_price - b.discont_price;
          });

    return sortedProducts;
  };

  useEffect(() => {
    // При изменении likedProducts фильтруем данные
    const filteredProducts = filterData(products);
    setFilteredData(filteredProducts);
  }, [products, minPrice, maxPrice, sort, showOnlyDiscounted]); // Добавляем likedProducts в зависимости

  // Возвращаем отфильтрованные данные для использования в компоненте
  return filteredData;
};
