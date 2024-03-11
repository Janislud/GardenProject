import React from "react";
import { useSelector } from "react-redux";
import { FilterBar } from "../FilterBar/FilterBar";
import { ProductsCard } from "../ProductsCard/ProductsCard";
import style from "./ProductsList.module.css";
import SkeletonForProductsCard from "../../UI/SkeletonForProductsCard";

export const ProductsList = ({ title }) => {
  const products = useSelector((state) => state.products.products);

  return (
    <section className={style.myFirstSection}>
      <FilterBar title={title} />
      <div className={style.productsList}>
        {products.length === 0 ? ( // Если массив products пуст, показываем скелетоны
          Array.from({ length: 10 }).map((_, index) => (
            <SkeletonForProductsCard key={index} />
          ))
        ) : (
          // Если массив products не пуст, рендерим карточки товаров
          products.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))
        )}
      </div>
    </section>
  );
};
