import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./ProductsCard.module.css";

export const ProductsCard = ({ product }) => {

  const [textButton, setTextButton] = useState(false)

  function handleClick (event) {
    event.preventDefault()
    setTextButton(true)
  }

  function calculateDiscountPercent(price, discountPrice) {
    return Math.round(((price - discountPrice) / price) * 100);
  }

  return (

    <Link
      key={product.id}
      className={style.saleCard}
    >
      {
        product.discont_price && product.price &&
        <div className={style.saleBlock}>
          -{`${calculateDiscountPercent(product.price, product.discont_price)}`}%
        </div>
      }
      <img
        className={style.saleImg}
        src={`http://localhost:3333${product.image}`}
        alt={product.title}
      />
      <button className={style.productCartButton} onClick={handleClick} >
        {textButton ? "Added" : "Add to cart"}
        </button>
      <h2 className={style.saleCardText}>{product.title}</h2>
      <div className={style.salePriceWrapper}>
        <p className={style.realPrice}>${product.discont_price ?? product.price}</p>
        {product.discont_price ? (
          <p className={style.firstPrice}>${product.price}</p>
        ) : null}
      </div>
    </Link>
  );
};

export default ProductsCard;
