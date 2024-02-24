import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import cartBlack from "../../assets/images/CartMedia/cart-black-img.svg";
// import cartGreen from "../../assets/images/CartMedia/cart-green-img.svg";
// import cart from "../../assets/images/CartMedia/cart-img.svg";
import { addProductToCart } from "../../slices/cartSlice";
import style from "./ProductsCard.module.css";

export const ProductsCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (event) => {
    event.preventDefault();
    dispatch(addProductToCart(product)); // вызываем действие при добавлении в корзину
    setIsAddedToCart(true);
  };

  function calculateDiscountPercent(price, discountPrice) {
    return Math.round(((price - discountPrice) / price) * 100);
  }

  return (
    <Link
      key={product.id}
      className={style.saleCard}
      to={`/products/${product.id}`}
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
      >
        {/* <img
          src={isAddedToCart ? cartGreen : isHovered ? cartBlack : cart}
          alt="cart"
        /> */}
      </button>
    </Link>
  );
};
