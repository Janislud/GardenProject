import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { addProductToCart } from "../../slices/cartSlice";
import style from "./ProductsCard.module.css";

export const ProductsCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const location = useLocation();
  const theme = useSelector((state) => state.theme.theme);
  const cartItems = useSelector((state) => state.cart.products);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Проверяем, был ли товар добавлен в корзину ранее при загрузке компонента
    const isAlreadyAdded = cartItems.some((item) => item.id === product.id);
    setIsAddedToCart(isAlreadyAdded);
  }, [cartItems, product.id]);

  const handleAddToCart = (event) => {
    event.preventDefault();
    dispatch(addProductToCart({ ...product, quantity: 1 }));
    setIsAddedToCart(true);
  };

  const handleRemoveFromCart = () => {
    dispatch(dropOneProductFromCart({ id: product.id }));
    setIsAddedToCart(false); // Обновляем состояние при удалении товара из корзины
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
      {isHovered && (
        <button
          className={isAddedToCart ? style.addedToCart : style.btnAddToCard}
          onClick={isAddedToCart ? handleRemoveFromCart : handleAddToCart}
        >
          {isAddedToCart ? "Added" : "Add to cart"}
        </button>
      )}
    </Link>
  );
};
