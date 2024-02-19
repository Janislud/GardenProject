import React from "react";
import { ProductsList } from '../Components/ProductsList/ProductsList';
import { AllProductsFilter } from '../hooks/useFilterAllProducts';

export const ProductsPage = () => {
  return (
    <div>
      <AllProductsFilter />
      <ProductsList title={'All Products'}/>
    </div>
  );
};