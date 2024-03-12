import React, { useEffect } from "react";
import { BreadCrumbs } from "../Components/BreadCrumbs/BreadCrumbs";
import { ProductsList } from "../Components/ProductsList/ProductsList";
import { AllSalesFilter } from "../hooks/useFilterAllSales";

export const AllSalesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <BreadCrumbs />
      <AllSalesFilter />
      <ProductsList title={"All Sales"} />
    </main>
  );
};
