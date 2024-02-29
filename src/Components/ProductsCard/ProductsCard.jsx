import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import heartRed from "../../assets/images/LikesMedia/heartRed.svg";
import heartWhite from "../../assets/images/LikesMedia/heartWhite.svg";
import { addProductToCart } from "../../slices/cartSlice";
import {
  addToLikedProducts,
  deleteFromLikedProducts,
  getLikedProductsQuantity,
} from "../../slices/likedProductsSlice";
import style from "./ProductsCard.module.css";

export const ProductsCard = ({ product, id }) => {
  const dispatch = useDispatch();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToLikedProducts, setIsAddedToLikedProducts] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const isLiked = useSelector((state) =>
    state.likedProducts.likedProducts.some((product) => product.id === id)
  );

  const handleAddToCart = (event) => {
    event.preventDefault();
    dispatch(addProductToCart(product)); // вызываем действие при добавлении в корзину
    setIsAddedToCart(true);
  };

  const handleAddToLikedProduct = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isLiked) {
      dispatch(deleteFromLikedProducts(product));
    } else {
      dispatch(addToLikedProducts(product));
    }
    dispatch(getLikedProductsQuantity());
    setIsAddedToLikedProducts(true);
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
      <h2 className={style.saleCardText}>{product.title}</h2>
      <div className={style.salePriceWrapper}>
        <p className={style.realPrice}>
          ${product.discont_price ?? product.price}
        </p>
        {product.discont_price ? (
          <p className={style.firstPrice}>${product.price}</p>
        ) : null}
      </div>

      <button
        className={style.btnAddToCard}
        onClick={handleAddToCart}
        onMouseEnter={() => {
          if (!isAddedToCart) {
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => {
          // Если товар уже добавлен в корзину, игнорируем изменение изображения при уходе курсора
          if (!isAddedToCart) {
            setIsHovered(false);
          }
        }}
      ></button>

      <button
        className={style.btnAddToCard}
        onClick={handleAddToLikedProduct}
        onMouseEnter={() => {
          if (!isAddedToLikedProducts) {
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => {
          // Если товар уже добавлен в корзину, игнорируем изменение изображения при уходе курсора
          if (!isAddedToLikedProducts) {
            setIsHovered(false);
          }
        }}
      >
        <img
          src={isLiked ? heartRed : isHovered ? heartRed : heartWhite}
          alt="heartIcon"
          className={style.heartIcon}
        />
      </button>
    </Link>
  );
};
