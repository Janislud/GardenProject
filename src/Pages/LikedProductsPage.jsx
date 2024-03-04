import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BreadCrumbs } from "../Components/BreadCrumbs/BreadCrumbs";
import { FilterBar } from "../Components/FilterBar/FilterBar";
import { ProductsCard } from "../Components/ProductsCard/ProductsCard";
import { TitleBar } from "../Components/TitleBar/TitleBar";
import { AllProductsFilter } from "../hooks/useFilterAllProducts";
import style from "./LikedProductsPage.module.css";

export const LikedProductsPage = () => {
  const likedProducts = useSelector(
    (state) => state.likedProducts.likedProducts
  );

  return (
    <section>
      <BreadCrumbs />
      <TitleBar
        title="Favourite Products"
        linkTo="/products"
        buttonText="Back to the store"
      />

      <FilterBar />
      <AllProductsFilter />
      {(!Array.isArray(likedProducts) || likedProducts.length === 0) && (
        <div className={style.emptyLikedProducts}>
          Oops! There are no liked products...
        </div>
      )}

      <div className={style.likedProductsList}>
        {likedProducts.map((product) => (
          <div className={style.productCard}>
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              state={{ prevPath: location.pathname }}
            >
              <ProductsCard product={product} id={product.id} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
