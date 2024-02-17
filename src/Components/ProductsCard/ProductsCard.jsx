import React from "react";
import { Link } from "react-router-dom";
import style from "./ProductsCard.module.css";

export const ProductsCard = ({ product }) => {
  return (
    <Link
      key={product.id}
      className={style.saleCard}
      to={`products/${product.id}`}
    >
      <div className={style.saleBlock}>
        {product.discont_price !== null
          ? `-${Math.round(
              ((product.price - product.discont_price) / product.price) * 100
            )}%`
          : `${product.price}`}
      </div>

      <img
        className={style.saleImg}
        src={`http://localhost:3333${product.image}`}
        alt={product.title}
      />
      <h2 className={style.saleCardText}>{product.title}</h2>

      <div className={style.salePriceWrapper}>
        <p className={style.realPrice}>${product.discont_price}</p>

        {product.discont_price ? (
          <p className={style.firstPrice}>${product.price}</p>
        ) : null}
      </div>
    </Link>
  );
};

export default ProductsCard;
