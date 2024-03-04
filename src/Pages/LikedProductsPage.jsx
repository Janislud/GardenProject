import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BreadCrumbs } from "../Components/BreadCrumbs/BreadCrumbs";
import { ProductsCard } from "../Components/ProductsCard/ProductsCard";
import { TitleBar } from "../Components/TitleBar/TitleBar";
import { FilterFavorits } from "../hooks/useFilterFavarits";
import { FilterBar } from "./../Components/FilterBar/FilterBar";
import style from "./LikedProductsPage.module.css";

export const LikedProductsPage = ({ title }) => {
  const likedProducts = useSelector(
    (state) => state.likedProducts.likedProducts
  );

  // Вызываем хук, чтобы он мог выполнить фильтрацию и сортировку
  const filteredProducts = FilterFavorits(likedProducts);

  return (
    <section>
      <BreadCrumbs />
      <TitleBar
        title="Liked Products"
        linkTo="/products"
        buttonText="Back to the store"
      />

      <FilterBar title={title} />

      {(!Array.isArray(likedProducts) || likedProducts.length === 0) && (
        <div className={style.emptyLikedProducts}>
          Oops! There are no liked products...
        </div>
      )}

      <div className={style.likedProductsList}>
        {/* Выводим отфильтрованные продукты */}
        {filteredProducts.map((product) => (
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
