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
        title="Liked Products"
        linkTo="/favorites"
        buttonText="Back to the store"
      />

      {(!Array.isArray(likedProducts) || likedProducts.length === 0) && (
        <div className={style.emptyLikedProducts}>
          Oops! There are no liked products...
        </div>
      )}
      <FilterBar />
      <AllProductsFilter />
      <div className={style.likedProductsList}>
        {likedProducts.map((product) => (
          <div className={style.productCard} key={product.id}>
            <Link to={`/products/${product.id}`}>
              <ProductsCard product={product} id={product.id} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
