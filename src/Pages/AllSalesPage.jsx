import React, { useEffect } from "react";
import { ProductsList } from "../Components/ProductsList/ProductsList";
import { productsLoadedWithDiscount } from "../slices/productsSlice";
import { useDispatch } from "react-redux";
import { useGetProductsQuery } from "../slices/apiSlice";
import { TitleBar } from "../Components/TitleBar/TitleBar";

export const AllSalesPage = () => {
  const dispatch = useDispatch();

  const { isLoading, products, error } = useGetProductsQuery();

  useEffect(() => {
    if (isLoading) dispatch(startFetching());
    if (error) dispatch(productsLoadFailed(error));
    if (products) dispatch(productsLoadedWithDiscount(products.products));
  }, [isLoading, products, error]);

  return (
    <main>
      <TitleBar title="Sale" linkTo="/all-sales" buttonText="All Sales" />
      <ProductsList />
    </main>
  );
};
