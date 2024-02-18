import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ProductsList } from "../Components/ProductsList/ProductsList";
import { useGetProductsQuery } from "../slices/apiSlice";
import { productsLoadedWithDiscount, productsLoadFailed, startFetching } from "../slices/productsSlice";

export const AllSalesPage = () => {
  const dispatch = useDispatch();

  const { isLoading, data, error } = useGetProductsQuery();

  useEffect(() => {
    if (isLoading) dispatch(startFetching());
    if (error) dispatch(productsLoadFailed(error));
    if (data) dispatch(productsLoadedWithDiscount(data));
  }, [isLoading, data, error]);

  return (
    <main>
      <ProductsList />
    </main>
  );
};