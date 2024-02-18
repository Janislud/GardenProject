import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductsList } from '../Components/ProductsList/ProductsList';
import { useGetProductsQuery } from "../slices/apiSlice";
import { productsLoadFailed, productsLoaded, startFetching } from "../slices/productsSlice.js";

export const ProductsPage = () => {

  const dispatch = useDispatch();

  const { isLoading, data, error } = useGetProductsQuery();
  const { minPrice, maxPrice, sort ,showOnlyDiscounted} = useSelector((state) => state.filter)

 

  useEffect(() => {

        if (data?.length) {
            let filteredProducts = data;
            
            if (showOnlyDiscounted) {
                filteredProducts = filteredProducts.filter((product) => product.discont_price);
              
            }
            
            
            filteredProducts = filteredProducts.filter((product) => (
                (!minPrice || product.price >= Number(minPrice)) &&
                (!maxPrice || product.price <= Number(maxPrice))
            ));

            const sortedProducts = sort === '' || sort === 'by default' ?
                filteredProducts :
                filteredProducts.sort((a, b) => {
                    return sort === 'Ascending' ? b.price - a.price : a.price - b.price;
                    
                });
                dispatch(productsLoaded(sortedProducts))
        }
        
    }, [data, minPrice, maxPrice, sort, showOnlyDiscounted]);

    
  useEffect( () => {
    if (isLoading) dispatch(startFetching());
    if (error) dispatch(productsLoadFailed(error));
    if (data) dispatch(productsLoaded(data));
  }, [isLoading, data, error]);


   return (
    <div>
      <ProductsList title={'All Products'}/>
    </div>
  );
};