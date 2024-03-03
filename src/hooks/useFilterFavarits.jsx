import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const FilterFavorits = (products) => {
  const { minPrice, maxPrice, sort, showOnlyDiscounted } = useSelector(
    (state) => state.filter
  );
  const [filteredData, setFilteredData] = useState([]);

  // Функция фильтрации данных
  const filterData = (products) => {
    let filteredProducts = products;

    // Фильтрация по цене
    filteredProducts = filteredProducts.filter((product) => {
      const hasDiscount = typeof product.discont_price === "number";
      const priceToCheck = hasDiscount ? product.discont_price : product.price;
      return (
        (!minPrice || priceToCheck >= Number(minPrice)) &&
        (!maxPrice || priceToCheck <= Number(maxPrice))
      );
    });

    // Фильтрация по наличию скидки, если установлен флаг showOnlyDiscounted
    if (showOnlyDiscounted) {
      filteredProducts = filteredProducts.filter(
        (product) => product.discont_price
      );
    }

    // Сортировка
    const sortedProducts =
      sort === "" || sort === "by default"
        ? filteredProducts
        : filteredProducts.slice().sort((a, b) => {
            const aPrice = a.discont_price || a.price;
            const bPrice = b.discont_price || b.price;
            return sort === "Ascending" ? bPrice - aPrice : aPrice - bPrice;
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
