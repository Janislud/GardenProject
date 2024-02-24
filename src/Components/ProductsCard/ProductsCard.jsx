import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addProductToCart } from "../../slices/cartSlice";
import style from "./ProductsCard.module.css";

export const ProductsCard = ({ product }) => {

const dispatch = useDispatch();
  const handleAddToCart = ( event ) => {
    event.preventDefault();
    dispatch(addProductToCart(product)); // вызываем действие при добавлении в корзину
  };

function calculateDiscountPercent(price, discountPrice) {
    return Math.round(((price - discountPrice) / price) * 100);
  };

  return (

    <Link
      key={product.id}
      className={style.saleCard}
      to={`/single-product/${product.id}`}
    >
 {
  product.discont_price && product.price &&
  <div className={style.saleBlock}> 
    -{calculateDiscountPercent(product.price, product.discont_price)}%
  </div>
}
      <img
        className={style.saleImg}
        src={`http://localhost:3333${product.image}`}
        alt={product.title}
      />
      {/* <button className={style.productCartButton} onClick={handleClick} >
        {textButton ? "Added" : "Add to cart"}
        </button> */}
      <h2 className={style.saleCardText}>{product.title}</h2>
      <div className={style.salePriceWrapper}>
        <p className={style.realPrice}>${product.discont_price ?? product.price}</p>
        {product.discont_price ? (
          <p className={style.firstPrice}>${product.price}</p>
        ) : null}
      </div>
        <button className={style.btnAddToCard} onClick={handleAddToCart}> 
        Add to cart
        </button>
    </Link>
    )
 
  ;
};