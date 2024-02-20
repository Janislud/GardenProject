import React from 'react';
import { useSelector } from 'react-redux';
import style from '../Cart/Cart.module.css';

export const Cart = () => {
    // Получаем список товаров из состояния Redux
    const cartProducts = useSelector(state => state.cart.products);

   // Проверяем, является ли cartProducts массивом и содержит ли он товары
    if (!Array.isArray(cartProducts) || cartProducts.length === 0) {
        return <div className={style.emptyCart}>Cart is empty</div>; // Возвращаем сообщение, если нет товаров в корзине или cartProducts не является массивом
    }

    return (
        <section className={style.CartWrapper}>
            <div className={style.cartProductWrapper}>
                {/* Маппим список товаров и отображаем каждый из них */}
                {cartProducts.map(product => (
                    <div key={product.id} className={style.cartProduct}>
                        <img className={style.cartImgSize} src={`http://localhost:3333${product.image}`} alt={product.title} />
                        <div className={style.priceWrapper}>
                            <h3 className={style.productCardTitle}>{product.title}</h3>
                            <p className={style.productCardPrice}>{product.price}</p>
                            <p className={style.productCardDiscountPrice}>{product.discont_price}</p>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    )
}