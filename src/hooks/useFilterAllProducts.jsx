import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../slices/apiSlice";
import {
  productsLoadFailed,
  productsLoaded,
  startFetching,
} from "../slices/productsSlice";

export const AllProductsFilter = () => {
  const { isLoading, data, error } = useGetProductsQuery();
  const { minPrice, maxPrice, sort, showOnlyDiscounted } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.length) {
      let filteredProducts = data;

      // Фильтрация по наличию скидки, если установлен флаг showOnlyDiscounted
      if (showOnlyDiscounted) {
        filteredProducts = filteredProducts.filter(
          (product) => product.discont_price
        );
      }

      // Фильтрация по цене
      filteredProducts = filteredProducts.filter((product) => {
        const hasDiscount = typeof product.discont_price === "number";
        const priceToCheck = hasDiscount
          ? product.discont_price
          : product.price;
        return (
          (!minPrice || priceToCheck >= Number(minPrice)) &&
          (!maxPrice || priceToCheck <= Number(maxPrice))
        );
      });

      // Сортировка
      const sortedProducts =
        sort === "" || sort === "by default"
          ? filteredProducts
          : filteredProducts.slice().sort((a, b) => {
              const aPrice = a.discont_price || a.price;
              const bPrice = b.discont_price || b.price;
              return sort === "Ascending" ? bPrice - aPrice : aPrice - bPrice;
            });

      dispatch(productsLoaded(sortedProducts));
    }
  }, [data, minPrice, maxPrice, sort, showOnlyDiscounted]);

  useEffect(() => {
    if (isLoading) dispatch(startFetching());
    if (error) dispatch(productsLoadFailed(error));
    if (data) dispatch(productsLoaded(data));
  }, [isLoading, data, error]);
};
