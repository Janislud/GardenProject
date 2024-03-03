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

  const handleAddToLiked = () => {
    if (selectedProduct) {
      dispatch(addToLikedProducts(selectedProduct));
    }
  };

  const handleRemoveFromLiked = () => {
    if (selectedProduct) {
      dispatch(deleteFromLikedProducts(selectedProduct.id));
    }
  };

  return (
    <div className={`${style.modal} ${isActive ? style.active : ''}`} onClick={onRequestClose}>
      <div className={`${style.modal_content} ${isActive ? style.active_content : ''}`} onClick={e => e.stopPropagation()}>
        {selectedProduct && (
          <Link to={`/products/${selectedProduct.id}`} onClick={onRequestClose}>
            <ProductsCard product={selectedProduct} id={selectedProduct.id} />
          </Link>
        )}
      </div>
    </div>
  );
  
};


// .modal {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: fixed;
//   top: 0;
//   left: 0;
//   height: 100vh;
//   width: 100vw;
//   background-color: rgba(0, 0, 0, 0.4);
//   opacity: 0;
//   pointer-events: none;
//   visibility: hidden;
//   transition: opacity 0.5s, visibility 0.5s;
// }

// .active {
//   opacity: 1;
//   pointer-events: all;
//   visibility: visible;
// }

// .modal_content {
//   padding: 20px;
//   border-radius: 12px;
//   background-color: white;
//   height: 200px;
//   width: 200px;
//   transform: scale(0.5);
//   transition: 0.4s all;
// }

// .active_content {
//   transform: scale(1);
// }