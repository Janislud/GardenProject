import React from "react";
import { ProductsList } from "../Components/ProductsList/ProductsList";
import { AllSalesFilter } from "../hooks/useFilterAllSales";

export const AllSalesPage = () => {
  

  return (
    <main>
      <AllSalesFilter />
      <ProductsList title={"All Sales"} />
    </main>
  );
};
