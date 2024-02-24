import React from 'react';
import { useSelector } from 'react-redux';
import { FilterBar } from '../FilterBar/FilterBar';
import { ProductsCard } from '../ProductsCard/ProductsCard';
import style from './ProductsList.module.css';

export const ProductsList = ({title}) => {
  const products = useSelector((state) => state.products.products);
    return (
      <section className={style.myFirstSection}>
        <FilterBar title={title} />
  <div className={style.productsList}>
      { products?.length && products.map((product) => (
        <ProductsCard key={product.id} product={product} />
      ))}
        </div>
      </section>
    
    );
};
