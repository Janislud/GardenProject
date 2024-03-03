import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cross from "../../assets/images/CartMedia/cross.png";
import {
  addProductToCart,
  dropOneProductFromCart,
  dropProductFromCart,
} from "../../slices/cartSlice";
import style from "../Cart/Cart.module.css";
import { DataCartForm } from "../DataCartForm/DataCartForm";

export const Cart = () => {
  const cartProducts = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  // Обработчик события для удаления товара из корзины
  const handleRemoveFromCart = (productId, price, count) => {
    dispatch(
      dropProductFromCart({ id: productId, price: price, quantity: count })
    );
  };

  // Обработчик события для добавления одного товара к уже имеющемуся количеству
  const handleAddOneToCart = (productId, price, count, discontPrice) => {
    // Проверяем, есть ли у товара скидка
    if (discontPrice) {
      // Если есть скидка, добавляем товар с учетом скидочной цены
      dispatch(
        addProductToCart({ id: productId, price: discontPrice, quantity: 1 })
      );
    } else {
      // Если скидки нет, добавляем товар с обычной ценой
      dispatch(addProductToCart({ id: productId, price: price, quantity: 1 }));
    }
  };

  // Проверяем, является ли cartProducts массивом и содержит ли он товары
  if (!Array.isArray(cartProducts) || cartProducts.length === 0) {
    return (
      <div className={style.emptyCart}>
        <h2>Looks like you have no items in your basket currently.</h2>
        <Link className={style.emptyCartBtn} to={"/"}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className={style.CartWrapper}>
      <div className={style.cartProductWrapper}>
        {cartProducts.map((product) => {
          const totalPrice = product.price * product.count;
          const discountedTotalPrice =
            product.discont_price !== null
              ? product.discont_price * product.count
              : null;
          return (
            <div key={product.id} className={style.cartProduct}>
              <img
                className={style.cartImgSize}
                src={`http://localhost:3333${product.image}`}
                alt={product.title}
              />
              <div className={style.productCardWrapper}>
                <h3 className={style.productCardTitle}>{product.title}</h3>
                <div className={style.countPlusPriceWrapper}>
                  <div className={style.btnWrapper}>
                    <button
                      className={style.btnMinus}
                      onClick={() =>
                        handleRemoveFromCart(
                          product.id,
                          product.price,
                          product.count
                        )
                      }
                    >
                      -
                    </button>
                    <p className={style.count}>{product.count}</p>
                    <button
                      className={style.btnPlus}
                      onClick={() =>
                        handleAddOneToCart(
                          product.id,
                          product.price,
                          product.count,
                          product.discont_price
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className={style.salePriceWrapper}>
                    {discountedTotalPrice !== null && (
                      <p className={style.discountedPrice}>
                        ${parseFloat(discountedTotalPrice.toFixed(2))}
                      </p>
                    )}
                    <p
                      className={
                        discountedTotalPrice === null
                          ? style.discountedPrice
                          : style.realPrice
                      }
                    >
                      $
                      {totalPrice
                        ? totalPrice.toFixed(2)
                        : discountedTotalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              <button
                className={style.crossBtn}
                onClick={() =>
                  dispatch(dropOneProductFromCart({ id: product.id }))
                }
              >
                <img className={style.btnCroosImg} src={cross} alt="cross" />
              </button>
            </div>
          );
        })}
      </div>
      <DataCartForm />
    </section>
  );
};
