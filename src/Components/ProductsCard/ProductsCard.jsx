import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import heartRed from "../../assets/images/LikesMedia/heartRed.svg";
import heartWhite from "../../assets/images/LikesMedia/heartWhite.svg";
import {
  addProductToCart,
  dropOneProductFromCart,
} from "../../slices/cartSlice";
import {
  addToLikedProducts,
  deleteFromLikedProducts,
} from "../../slices/likedProductsSlice";
import style from "./ProductsCard.module.css";

export const ProductsCard = ({ product, id }) => {
  const dispatch = useDispatch();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const theme = useSelector((state) => state.theme.theme);
  const cartItems = useSelector((state) => state.cart.products);
  const likedItems = useSelector((state) => state.likedProducts.likedProducts);
  const [isHoveredLikes, setIsHoveredLikes] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Проверяем, был ли товар добавлен в корзину ранее при загрузке компонента
    const isAlreadyAdded = cartItems.some((item) => item.id === product.id);
    setIsAddedToCart(isAlreadyAdded);
  }, [cartItems, product.id]);

  useEffect(() => {
    // Проверяем, был ли товар добавлен в likedPage ранее при загрузке компонента
    const isAlreadyAddedToLiked = likedItems.some(
      (item) => item.id === product.id
    );
    setIsLiked(isAlreadyAddedToLiked);
  }, [likedItems, product.id]);

  const handleAddToLikedProduct = (event) => {
    event.preventDefault();
    if (isLiked) {
      dispatch(deleteFromLikedProducts(product));
      setIsLiked(false); // Сразу обновляем состояние isLiked
    } else {
      dispatch(addToLikedProducts(product));
      setIsLiked(true); // Сразу обновляем состояние isLiked
    }
  };

  const handleAddToCart = (event) => {
    event.preventDefault();
    dispatch(addProductToCart({ ...product, quantity: 1 }));
  };

  const handleRemoveFromCart = (event) => {
    event.preventDefault(event);
    dispatch(dropOneProductFromCart({ id: product.id }));
  };

  function calculateDiscountPercent(price, discountPrice) {
    return Math.round(((price - discountPrice) / price) * 100);
  }

  return (
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
          -{calculateDiscountPercent(product.price, product.discont_price)}%
        </div>
      )}
      <img
        className={style.saleImg}
        src={`http://localhost:3333${product.image}`}
        alt={product.title}
      />
      <div className={style.saleCardTextPriceWrapper}>
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
      </div>

      <button className={style.btnAddToLikes} onClick={handleAddToLikedProduct}>
        <img
          src={isLiked || isHoveredLikes ? heartRed : heartWhite}
          alt="heartIcon"
          className={style.heartIcon}
        />
      </button>

      {isHovered && (
        <button
          className={isAddedToCart ? style.addedToCart : style.btnAddToCard}
          onClick={isAddedToCart ? handleRemoveFromCart : handleAddToCart}
        >
          {isAddedToCart ? "Remove" : "Add to cart"}
        </button>
      )}
    </Link>
  );
};
