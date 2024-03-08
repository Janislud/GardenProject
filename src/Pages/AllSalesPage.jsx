import React from "react";
import { BreadCrumbs } from "../Components/BreadCrumbs/BreadCrumbs";
import { ProductsList } from "../Components/ProductsList/ProductsList";
import { AllSalesFilter } from "../hooks/useFilterAllSales";

export const AllSalesPage = ({isLoading}) => {

  if (isLoading) {
    return (
      <div className={style.loader}>
        <div className={style.loaderText}>Loading...</div>
        <div className={style.loaderAnimation}></div>
      </div>
    );
  }

  return (
    <main>
      <BreadCrumbs/>
      <AllSalesFilter />
      <ProductsList title={"All Sales"} />
    </main>
  );
};
