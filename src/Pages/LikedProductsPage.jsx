import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BreadCrumbs } from "../Components/BreadCrumbs/BreadCrumbs";
import { FilterBar } from "../Components/FilterBar/FilterBar";
import { ProductsCard } from "../Components/ProductsCard/ProductsCard";
import { TitleBar } from "../Components/TitleBar/TitleBar";
import trashBin from "../assets/images/LikesMedia/trashBin.svg";
import { AllProductsFilter } from "../hooks/useFilterAllProducts";
import { deleteFromLikedProducts } from "../slices/likedProductsSlice";
import style from "./LikedProductsPage.module.css";

export const LikedProductsPage = () => {
  const likedProducts = useSelector(
    (state) => state.likedProducts.likedProducts
  );

  const dispatch = useDispatch();

  return (
    <section>
      <BreadCrumbs data={likedProducts} />
      <TitleBar
        title="Liked Products"
        linkTo="/liked-products"
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
            <button
              className={style.btnDelete}
              onClick={(event) => {
                event.stopPropagation();
                dispatch(deleteFromLikedProducts({ id: product.id }));
              }}
            >
              <img src={trashBin} className={style.trashBin} alt="trashBin" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
