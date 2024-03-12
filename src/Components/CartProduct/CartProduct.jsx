import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cross from "../../assets/images/CartMedia/crossBlack.svg";
import crossWhite from "../../assets/images/CartMedia/crossWhite.svg";
import {
  addProductToCart,
  dropOneProductFromCart,
  dropProductFromCart,
  saveCartToLocalStorage,
} from "../../slices/cartSlice";
import style from "../CartProduct/CartProduct.module.css";

export const CartProduct = () => {
  const cartProducts = useSelector((state) => state.cart.products);
  const dispatch = useDispatch(); //передает данные из стора
  const theme = useSelector((state) => state.theme.theme);

  // Обработчик события для удаления товара из корзины
  const handleRemoveFromCart = (productId, price, count) => {
    dispatch(
      dropProductFromCart({ id: productId, price: price, quantity: count })
    );
    dispatch(saveCartToLocalStorage());
  };

  const deleteProdFromCart = (productId, price, count) => {
    dispatch(
      dropOneProductFromCart({ id: productId, price: price, quantity: count })
    );
    dispatch(saveCartToLocalStorage());
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
    dispatch(saveCartToLocalStorage());
  };

  return (
    <div className={style.cartProductWrapper}>
      {cartProducts.map((product) => {
        const totalPrice = product.price * product.count;
        const discountedTotalPrice =
          product.discont_price !== null
            ? product.discont_price * product.count
            : null;
        return (
          <div
            key={product.id}
            className={`${style.cartProduct} ${
              theme === "light" ? style.dark : style.light
            }`}
          >
            <Link
              className={style.linkCartImgSize}
              key={product.id}
              to={`/products/${product.id}`}
            >
              <img
                className={style.cartImgSize}
                src={`http://localhost:3333${product.image}`}
                alt={product.title}
              />
            </Link>
            <div className={style.productCardWrapper}>
              <Link
                className={style.linkCartImgSize}
                key={product.id}
                to={`/products/${product.id}`}
              >
                <h3 className={style.productCardTitle}>{product.title}</h3>
              </Link>
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
              className={`${style.crossBtn} ${
                theme === "light" ? style.dark : style.light
              }`}
              onClick={() =>
                deleteProdFromCart(product.id, product.price, product.count)
              }
            >
              {" "}
              {theme === "dark" ? (
                <img className={style.btnCrossImg} src={cross} alt="cross" />
              ) : (
                <img
                  className={style.btnCroosImg}
                  src={crossWhite}
                  alt="cross"
                />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};
