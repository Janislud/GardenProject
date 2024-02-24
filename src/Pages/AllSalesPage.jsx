import React from "react";
import { ProductsList } from "../Components/ProductsList/ProductsList";
import { AllSalesFilter } from "../hooks/useFilterAllSales";
import { BreadCrumbs } from "../Components/BreadCrumbs/BreadCrumbs";

export const AllSalesPage = () => {
  

  return (
    <main>
      <BreadCrumbs/>
      <AllSalesFilter />
      <ProductsList title={"All Sales"} />
    </main>
  );
};
