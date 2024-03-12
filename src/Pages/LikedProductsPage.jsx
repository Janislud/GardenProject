import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { BreadCrumbs } from "../Components/BreadCrumbs/BreadCrumbs";
import { TitleBar } from "../Components/TitleBar/TitleBar";
import heartRed from "../assets/images/LikesMedia/heartRed.svg";
import { FilterFavorits } from "../hooks/useFilterFavarits";
import { addProductToCart, dropOneProductFromCart } from "../slices/cartSlice";
import { deleteFromLikedProducts } from "../slices/likedProductsSlice";
import { FilterBar } from "./../Components/FilterBar/FilterBar";
import style from "./LikedProductsPage.module.css";

export const LikedProductsPage = ({ title, id, isLoading }) => {
  const likedProducts = useSelector(
    (state) => state.likedProducts.likedProducts
  );
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCartMap, setAddedToCartMap] = useState({}); // Создаем состояние для отслеживания добавленных товаров
  const location = useLocation();
  const filteredProducts = FilterFavorits(likedProducts);
  const cartItems = useSelector((state) => state.cart.products);

  useEffect(() => {
    // Проверяем, был ли товар добавлен в корзину ранее при загрузке компонента
    filteredProducts.forEach((product) => {
      const isAlreadyAdded = cartItems.some((item) => item.id === product.id);
      setAddedToCartMap((prevState) => ({
        ...prevState,
        [product.id]: isAlreadyAdded,
      }));
    });
  }, [cartItems, filteredProducts]);

  const handleDeleteFromFavorits = (productId) => {
    dispatch(deleteFromLikedProducts({ id: productId }));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(dropOneProductFromCart({ ...product, quantity: 1 }));
  };

  const handleAddToCart = (product, event) => {
    event.preventDefault();
    dispatch(addProductToCart({ ...product, quantity: 1 }));
  };

  function calculateDiscountPercent(price, discountPrice) {
    return Math.round(((price - discountPrice) / price) * 100);
  }

  return (
    <section>
      <BreadCrumbs />
      <TitleBar
        title="Favourites"
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
        {filteredProducts.map((product) => (
          <div className={style.productCard} key={product.id}>
            <Link
              key={product.id}
              className={style.saleCard}
              to={`/products/${product.id}`}
              state={{ prevPath: location.pathname }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {product.discont_price && product.price && (
                <div className={style.saleBlock}>
                  -
                  {calculateDiscountPercent(
                    product.price,
                    product.discont_price
                  )}
                  %
                </div>
              )}
              <img
                className={style.saleImg}
                src={`http://localhost:3333${product.image}`}
                alt={product.title}
              />

              <h2
                className={`${style.saleCardText} ${
                  theme === "light" ? style.dark : style.light
                }`}
              >
                {product.title}
              </h2>
              <div
                className={`${style.salePriceWrapper} ${
                  theme === "light" ? style.dark : style.light
                }`}
              >
                <p className={style.realPrice}>
                  ${product.discont_price ?? product.price}
                </p>
                {product.discont_price ? (
                  <p className={style.firstPrice}>${product.price}</p>
                ) : null}
              </div>

              <button
                className={style.btnAddToLikes}
                onClick={(event) => {
                  event.preventDefault();
                  handleDeleteFromFavorits(product.id);
                }}
              >
                <img
                  src={heartRed}
                  alt="heartIcon"
                  className={style.heartIcon}
                />
              </button>

              {isHovered && (
                <button
                  className={
                    addedToCartMap[product.id]
                      ? style.addedToCart
                      : style.btnAddToCard
                  }
                  onClick={(event) => {
                    event.preventDefault();
                    addedToCartMap[product.id]
                      ? handleRemoveFromCart(product)
                      : handleAddToCart(product, event); // Передаем event в функцию handleAddToCart
                  }}
                >
                  {addedToCartMap[product.id] ? "Remove" : "Add to cart"}
                </button>
              )}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
