import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../slices/apiSlice";
import { addProductToCart } from "../../slices/cartSlice";
import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs";
import { Button } from "../Button/Button";
import style from "./singleProduct.module.css";

export const SingleProduct = ({ product }) => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProductByIdQuery(id);
  const [space, setSpace] = useState(false);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

const increase = () => {
  setQuantity(quantity + 1);
};

const decrease = () => {
  if (quantity > 1) {
    setQuantity(quantity - 1);
  }
};

const handleAddToCart = (product) => {
  dispatch(addProductToCart({ ...product, quantity: parseInt(quantity), price: product.price }));
};

const switcherText = (event) => {
    event.preventDefault();
    setSpace((prevSpace) => !prevSpace);
};

if (error) {
    return <p className={style.featchingDate}>Error featching date: {error.message}</p>;
}

if (isLoading) {
    return <p className={style.featchingDate}>Loading...</p>;
}

function calculateDiscountPercent(price, discountPrice) {
    return Math.round(((price - discountPrice) / price) * 100);
};

return (
    <>
      <BreadCrumbs data={data[0]} />
      <section className={style.mainDivSingleProduct}>
        <section className={style.divSingleProduct}>
          {data.map((product) => (
            <div key={product.id} className={style.saleBlock}>
              <div className={style.productItemImage}>
                <img
                  className={style.imgProduct}
                  src={`http://localhost:3333${product.image}`}
                  alt={product.title}
                />
              </div>

              <div className={style.divWithPriceCounterDescription}>
                <h2 className={style.h2TitleText}>{product.title}</h2>
                <div className={style.divPrices}>
                  <p className={style.discontPrice}>${product.discont_price ? product.discont_price : product.price}</p>

                  {product.discont_price ? (
                    <p className={style.initialPrice}>
                      ${product.price}
                    </p>
                  ) : null}

                  {product.price &&
                    product.discont_price &&
                    product.price !== product.discont_price && (
                      <div className={style.percentagePrice}> 
                      -{calculateDiscountPercent(product.price, product.discont_price)}%
                    </div>
                    )}
                </div>
                <div className={style.counterUndButton}>
                  <div className={style.divCounter}>
      <button className={style.minusButton} onClick={decrease}>-</button>
            <input
          className={style.countInput}
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
      <button className={style.plusButton} onClick={increase}>+</button>
    </div>
                  <div className={style.divButton}>
                    <Button
                      className={style.addGreenButton}
                      buttonClass="primary"
                      text="Add to cart"
                      onClick={() => handleAddToCart(product)}
                    />
                  </div>
                </div>

                <div className={style.productDescription}>
                  <h6 className={style.h6Description}>Description</h6>
                  <p
                    className={`${style.productTextDescriptionMain} ${
                      space ? "" : style.clamp
                    }`}
                  >
                    {product.description}
                  </p>

                  <button
                    onClick={switcherText}
                    className={style.productTextDescriptionReadMore}
                  >
                    Read more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </section>
    </>
  );
};
