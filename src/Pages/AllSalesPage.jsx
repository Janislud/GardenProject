import React from "react";
import { BreadCrumbs } from "../Components/BreadCrumbs/BreadCrumbs";
import { ProductsList } from "../Components/ProductsList/ProductsList";
import { AllSalesFilter } from "../hooks/useFilterAllSales";

export const AllSalesPage = () => {
  

  return (
    <main>
      <BreadCrumbs/>
      <AllSalesFilter />
      <ProductsList title={"All Sales"} />
    </main>
  );
};
