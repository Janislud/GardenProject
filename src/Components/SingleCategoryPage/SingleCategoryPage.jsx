import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useGetCategoriesByIdQuery } from "../../slices/apiSlice";
import { FilterBar } from "../FilterBar/FilterBar";
import style from "./SingleCategoryPage.module.css";
import { ProductsCard } from "../ProductsCard/ProductsCard";

export const SingleCategoryPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetCategoriesByIdQuery(id);
  const { minPrice, maxPrice, sort, showOnlyDiscounted } = useSelector(
    (state) => state.filter
  );
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data && data.data) {
      let filteredProducts = data.data;

      if (showOnlyDiscounted) {
        filteredProducts = filteredProducts.filter(
          (product) => product.discont_price
        );
      }

      filteredProducts = filteredProducts.filter(
        (product) =>
          (!minPrice || product.price >= Number(minPrice)) &&
          (!maxPrice || product.price <= Number(maxPrice))
      );

      const sortedProducts =
        sort === "" || sort === "by default"
          ? filteredProducts
          : filteredProducts.sort((a, b) => {
              return sort === "Ascending"
                ? b.price - a.price
                : a.price - b.price;
            });

      setProducts(sortedProducts);
    }
  }, [data, minPrice, maxPrice, sort, showOnlyDiscounted]);

  if (error) {
    return <h2>Error....</h2>;
  }
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className={style.singleCategoryWrapper}>
      <div className={style.singleBtnWrapper}></div>
      <FilterBar title="Annuals" />
      <div className={style.singleCategoryCardsWrapper}>
        {products.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
