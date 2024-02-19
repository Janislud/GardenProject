import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductsList } from "../Components/ProductsList/ProductsList";
import { useGetProductsQuery } from "../slices/apiSlice";
import {
  productsLoadedWithDiscount,
  productsLoadFailed,
  startFetching,
} from "../slices/productsSlice";

export const AllSalesPage = () => {
  const dispatch = useDispatch();
  const { minPrice, maxPrice, sort, showOnlyDiscounted } = useSelector(
    (state) => state.filter
  );
  const { isLoading, data, error } = useGetProductsQuery();
  useEffect(() => {
    if (data?.length) {
      let filteredProducts = data;
      filteredProducts = filteredProducts.filter(
        (product) =>
          (!minPrice || product.price >= Number(minPrice)) &&
          (!maxPrice || product.price <= Number(maxPrice))
      );

      const sortedProducts =
        sort === "" || sort === "by default"
          ? filteredProducts
          : filteredProducts.sort((a, b) => {
              return sort === "Ascending"
                ? b.price - a.price
                : a.price - b.price;
            });
      dispatch(productsLoadedWithDiscount(sortedProducts));
    }
  }, [data, minPrice, maxPrice, sort, showOnlyDiscounted]);

  useEffect(() => {
    if (isLoading) dispatch(startFetching());
    if (error) dispatch(productsLoadFailed(error));
    if (data) dispatch(productsLoadedWithDiscount(data));
  }, [isLoading, data, error]);

  return (
    <main>
      <ProductsList title={"All Sales"} />
    </main>
  );
};
