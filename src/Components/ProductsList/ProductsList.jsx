import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FilterBar } from "../FilterBar/FilterBar";
import { ProductsCard } from "../ProductsCard/ProductsCard";
import style from "./ProductsList.module.css";
import SkeletonForProductsCard from "../../UI/SkeletonForProductsCard";
import CustomPagination from "../../UI/Pagination";

export const ProductsList = ({ title }) => {
  const products = useSelector((state) => state.products.products);
  const productsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (event, page) => {
    event.preventDefault(); 
    setCurrentPage(page);
  };

  return (
    <section className={style.myFirstSection}>
      <FilterBar title={title} />
      <div className={style.productsList}>
        {products.length === 0 ? (
          Array.from({ length: 10 }).map((_, index) => (
            <SkeletonForProductsCard key={index} />
          ))
        ) : (
          currentProducts.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))
        )}
      </div>
      <CustomPagination count={totalPages} handleChange={handlePageChange} />
    </section>
  );
};
