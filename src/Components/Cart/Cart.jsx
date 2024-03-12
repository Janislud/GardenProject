import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "../Cart/Cart.module.css";
import { CartProduct } from "../CartProduct/CartProduct";
import { DataCartForm } from "../DataCartForm/DataCartForm";

export const Cart = () => {
  const cartProducts = useSelector((state) => state.cart.products);

  // Проверяем, является ли cartProducts массивом и содержит ли он товары
  if (!Array.isArray(cartProducts) || cartProducts.length === 0) {
    return (
      <div className={style.emptyCart}>
        <h2 className={style.emptyCartMessage}>
          Looks like you have no items in your basket currently.
        </h2>
        <Link className={style.emptyCartBtn} to={"/"}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className={style.CartWrapper}>
      <CartProduct />
      <DataCartForm />
    </section>
  );
};
