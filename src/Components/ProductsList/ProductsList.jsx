import React from "react";
import { useSelector } from "react-redux";
import ProductsCard from "../ProductsCard/ProductsCard";
import style from "./ProductsList.module.css";

export const ProductsList = () => {
  const products = useSelector((state) => state.products.products);

  return (
    <div className={style.productsList}>
      {products?.length &&
        products.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
    </div>
  );
};
