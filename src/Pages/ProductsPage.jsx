import React, { useEffect } from "react";
import { BreadCrumbs } from "../Components/BreadCrumbs/BreadCrumbs";
import { ProductsList } from "../Components/ProductsList/ProductsList";
import { AllProductsFilter } from "../hooks/useFilterAllProducts";

export const ProductsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <BreadCrumbs />
      <AllProductsFilter />
      <ProductsList title={"All Products"} />
    </main>
  );
};
