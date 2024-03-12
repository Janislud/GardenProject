import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../slices/apiSlice";
import { productsLoadFailed, productsLoadedWithDiscount, startFetching } from "../slices/productsSlice";

export const AllSalesFilter = () => {
    const dispatch = useDispatch();
    const { minPrice, maxPrice, sort, showOnlyDiscounted } = useSelector((state) => state.filter);
    const { isLoading, data, error } = useGetProductsQuery();

  useEffect(() => {

    if (data?.length) {

      let filteredProducts = data;
      
      filteredProducts = filteredProducts.filter(
        (product) =>
          (!minPrice || product.discont_price >= Number(minPrice)) &&
          (!maxPrice || product.discont_price <= Number(maxPrice))
      );

      const sortedProducts = sort === "" || sort === "by default" ? filteredProducts : filteredProducts.sort((a, b) => {
                return sort === "Ascending" ? b.discont_price - a.discont_price : a.discont_price - b.discont_price; });
      dispatch(productsLoadedWithDiscount(sortedProducts));
    }
  }, [data, minPrice, maxPrice, sort, showOnlyDiscounted]);

  useEffect(() => {
    if (isLoading) dispatch(startFetching());
    if (error) dispatch(productsLoadFailed(error));
    if (data) dispatch(productsLoadedWithDiscount(data));
  }, [isLoading, data, error]);

}