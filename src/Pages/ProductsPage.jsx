import React, { useEffect } from "react";
import { ProductsList } from '../Components/ProductsList/ProductsList';
import { TitleBar} from '../Components/TitleBar/TitleBar';
import { useDispatch } from "react-redux";
import { productsLoadFailed, productsLoaded, startFetching } from "../slices/productsSlice.js";
import { useGetProductsQuery } from "../slices/apiSlice";

export const ProductsPage = () => {

  const dispatch = useDispatch();

  const { isLoading, products, error } = useGetProductsQuery()

  useEffect( () => {
    if (isLoading) dispatch(startFetching());
    if (error) dispatch(productsLoadFailed(error));
    if (products) dispatch(productsLoaded(products.products));
  }, [isLoading, products, error]);

   return (
    <div>
      <TitleBar title="All Products" linkTo="/all-products" buttonText="All Products" />
      <ProductsList />
    </div>
  );
};