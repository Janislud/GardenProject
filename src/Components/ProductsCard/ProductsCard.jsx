
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import cartGreen from "../../assets/images/CartMedia/cart-green-img.svg";
import cart from "../../assets/images/CartMedia/cart-img.svg";
import { addProductToCart } from "../../slices/cartSlice";
import style from "./ProductsCard.module.css";

export const ProductsCard = ({ product }) => {

const dispatch = useDispatch();
const [isAddedToCart, setIsAddedToCart] = useState(false);


  const handleAddToCart = ( event ) => {
    event.preventDefault();
    dispatch(addProductToCart(product)); // вызываем действие при добавлении в корзину
    setIsAddedToCart(true);
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
    
      <h2 className={style.saleCardText}>{product.title}</h2>
      <div className={style.salePriceWrapper}>
        <p className={style.realPrice}>${product.discont_price ?? product.price}</p>
        {product.discont_price ? (
          <p className={style.firstPrice}>${product.price}</p>
        ) : null}
      </div>
        <button className={style.btnAddToCard} onClick={handleAddToCart}> 
        <img src={isAddedToCart ? cartGreen : cart} alt="cart" style={{ filter: isAddedToCart ? 'none' : 'grayscale(100%)' }} />

        </button>
    </Link>
    )
 
  ;
};



