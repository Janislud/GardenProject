import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/apiSlice";
import { useDispatch } from 'react-redux';
import { ProductsCard } from '../ProductsCard/ProductsCard';


Modal.setAppElement('#root');

export const DiscountModal = ({ isOpen, onRequestClose }) => {
  const { data: products, isError, isLoading } = useGetProductsQuery();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();

  // Используем useEffect вместо useState для установки выбранного продукта
  useEffect(() => {
    if (isOpen && !isLoading && !isError && products) {
      const discountProducts = products.filter(p => p.discont_price);
      const randomProduct = discountProducts[Math.floor(Math.random() * discountProducts.length)];
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
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Product Detail">
      {selectedProduct && (
        <Link to={`/products/${selectedProduct.id}`} onClick={onRequestClose}>
        <ProductsCard product={selectedProduct} id={selectedProduct.id} />
      </Link>
      )}
    </Modal>
  );
};
