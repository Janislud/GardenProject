import React from 'react';
import style from './ProductsList.module.css';
import ProductsCard from '../ProductsCard/ProductsCard';
import { useSelector } from 'react-redux';


export const ProductsList = () => {
  const products = useSelector((state) => state.products.products);

    return (
      <div className={style.productsList}>
      { products?.length && products.map((product) => (
        <ProductsCard key={product.id} product={product} />
      ))}
        </div>
    );
};