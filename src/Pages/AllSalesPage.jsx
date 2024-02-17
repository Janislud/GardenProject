import React, { useEffect } from "react";
import { ProductsList } from "../Components/ProductsList/ProductsList";
import {productsLoadedWithDiscount, productsLoadFailed, startFetching} from "../slices/productsSlice";
import { useDispatch } from "react-redux";
import { useGetProductsQuery } from "../slices/apiSlice";
import { TitleBar } from "../Components/TitleBar/TitleBar";

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
      <TitleBar title="Sale" linkTo="/all-sales" buttonText="All Sales" />
      <ProductsList />
    </main>
  );
};