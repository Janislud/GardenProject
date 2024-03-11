import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { filterProducts } from "../../hooks/useFilterCategory";
import { useGetCategoriesByIdQuery } from "../../slices/apiSlice";
import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs";
import { FilterBar } from "../FilterBar/FilterBar";
import { ProductsCard } from "../ProductsCard/ProductsCard";
import style from "./SingleCategoryPage.module.css";
import SkeletonForProductsCard from "../../UI/SkeletonForProductsCard";

export const SingleCategoryPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetCategoriesByIdQuery(id);
  const { minPrice, maxPrice, sort, showOnlyDiscounted } = useSelector(
    (state) => state.filter
  );
  const [products, setProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    if (data && data.data) {
      const filteredProducts = filterProducts(data.data, {
        minPrice,
        maxPrice,
        sort,
        showOnlyDiscounted,
      });
      setProducts([...filteredProducts]);
    }
  }, [data, minPrice, maxPrice, sort, showOnlyDiscounted]);

  if (error) {
    return <h2>Error....</h2>;
  }
  if (isLoading) {
    return (
      <>
        <section className={style.singleCategoryWrapper}>
          <BreadCrumbs data={[]} />
          <div className={style.singleBtnWrapper}></div>
          <FilterBar title="" />
          <div className={style.singleCategoryCardsWrapper}>
            {[...Array(10)].map((_, index) => (
              <SkeletonForProductsCard key={index} />
            ))}
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className={style.singleCategoryWrapper}>
        <BreadCrumbs data={data.category} />
        <div className={style.singleBtnWrapper}></div>
        <FilterBar title={data.category.title} />
        <div className={style.singleCategoryCardsWrapper}>
          {products.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};
