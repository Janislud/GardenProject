import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../slices/apiSlice";
import { ProductsCard } from "../ProductsCard/ProductsCard";
import style from "./DiscountModal.module.css";

export const DiscountModal = ({ isOpen, onRequestClose }) => {
  const { data: products, isError, isLoading } = useGetProductsQuery();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsActive(true);
    } else {
      setTimeout(() => setIsActive(false), 500);
    }
  }, [isOpen]);

  // Используем useEffect вместо useState для установки выбранного продукта
  useEffect(() => {
    if (isOpen && !isLoading && !isError && products) {
      const discountProducts = products.filter((p) => p.discont_price);
      const randomProduct =
        discountProducts[Math.floor(Math.random() * discountProducts.length)];
      setSelectedProduct(randomProduct);
    }
  }, [isOpen, products, isLoading, isError]);

  return (
    <div
      className={`${style.modal} ${isActive ? style.active : ""}`}
      onClick={onRequestClose}
    >
      <div
        className={`${style.modal_content} ${
          isActive ? style.active_content : ""
        }`}
      >
        {selectedProduct && (
          <div to={`/products/${selectedProduct.id}`} onClick={onRequestClose}>
            <ProductsCard
              product={selectedProduct}
              id={selectedProduct.id}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </div>
  );
};
