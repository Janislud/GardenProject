import React from "react";
import { ProductsList } from '../Components/ProductsList/ProductsList';
import { AllProductsFilter } from '../hooks/useFilterAllProducts';
import { BreadCrumbs } from "../Components/BreadCrumbs/BreadCrumbs";

export const ProductsPage = () => {
  return (
    <div>
      <BreadCrumbs/>
      <AllProductsFilter />
      <ProductsList title={'All Products'}/>
    </div>
  );
};