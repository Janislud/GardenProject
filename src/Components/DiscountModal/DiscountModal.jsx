import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/apiSlice";
import { useDispatch } from "react-redux";
import { ProductsCard } from "../ProductsCard/ProductsCard";
import style from "./DiscountModal.module.css";

export const DiscountModal = ({ isOpen, onRequestClose }) => {
  const { data: products, isError, isLoading } = useGetProductsQuery();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();

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

  // Убеждаемся, что функции обработчики вызываются с правильным продуктом
  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addProductToCart({ ...selectedProduct, quantity: 1 }));
    }
  };

  return (
    <div className={`${style.modal} ${isActive ? style.active : ''}`} onClick={onRequestClose}>
      <div className={`${style.modal_content} ${isActive ? style.active_content : ''}`} onClick={e => e.stopPropagation()}>
        {selectedProduct && (
          <div to={`/products/${selectedProduct.id}`} onClick={onRequestClose}>
            <ProductsCard product={selectedProduct} id={selectedProduct.id} />
          </div>
        )}
      </div>
    </div>
  );
  
};


