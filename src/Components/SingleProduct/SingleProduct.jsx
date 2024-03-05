import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import heartRed from "../../assets/images/LikesMedia/heartRed.svg";
import heartWhite from "../../assets/images/LikesMedia/heartWhite.svg";
import { useGetProductByIdQuery } from "../../slices/apiSlice";
import { addProductToCart } from "../../slices/cartSlice";
import {
  addToLikedProducts,
  deleteFromLikedProducts,
  getLikedProductsQuantity,
} from "../../slices/likedProductsSlice";
import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs";
import { Button } from "../Button/Button";
import style from "./singleProduct.module.css";

export const SingleProduct = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProductByIdQuery(id);
  const [space, setSpace] = useState(false);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const theme = useSelector((state) => state.theme.theme);
  const [isLiked, setIsLiked] = useState(false);

  const increase = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addProductToCart({ ...product, quantity }));
  };

  const switcherText = (event) => {
    event.preventDefault();
    setSpace((prevSpace) => !prevSpace);
  };

  const handleAddToLikedProduct = (event) => {
    event.preventDefault();
    if (isLiked) {
      dispatch(deleteFromLikedProducts(data[0]));
    } else {
      dispatch(addToLikedProducts(data[0]));
    }
    dispatch(getLikedProductsQuantity());
    setIsLiked(!isLiked);
  };

  if (error) {
    return (
      <p className={style.featchingDate}>
        Error fetching date: {error.message}
      </p>
    );
  }

  if (isLoading) {
    return <p className={style.featchingDate}>Loading...</p>;
  }

  function calculateDiscountPercent(price, discountPrice) {
    return Math.round(((price - discountPrice) / price) * 100);
  }

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
                <div className={style.titleAndHeart}>
                  <h2
                    className={`${style.h2TitleText} ${
                      theme === "light" ? style.dark : style.light
                    }`}
                  >
                    {product.title}
                  </h2>
                  <button
                    className={style.btnAddToLikes}
                    onClick={handleAddToLikedProduct}
                  >
                    <img
                      src={isLiked ? heartRed : heartWhite}
                      alt="heartIcon"
                      className={style.heartIcon}
                    />
                  </button>
                </div>

                <div className={style.divPrices}>
                  <p
                    className={`${style.discontPrice} ${
                      theme === "light" ? style.dark : style.light
                    }`}
                  >
                    $
                    {product.discont_price
                      ? product.discont_price
                      : product.price}
                  </p>

                  {product.discont_price && (
                    <p className={style.initialPrice}>${product.price}</p>
                  )}

                  {product.price &&
                    product.discont_price &&
                    product.price !== product.discont_price && (
                      <div className={style.percentagePrice}>
                        -
                        {calculateDiscountPercent(
                          product.price,
                          product.discont_price
                        )}
                        %
                      </div>
                    )}
                </div>

                <div className={style.counterUndButton}>
                  <div className={style.divCounter}>
                    <button
                      className={`${style.minusButton} ${
                        theme === "light" ? style.dark : style.light
                      }`}
                      onClick={decrease}
                    >
                      -
                    </button>
                    <input
                      className={`${style.countInput} ${
                        theme === "light" ? style.dark : style.light
                      }`}
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                    <button
                      className={`${style.plusButton} ${
                        theme === "light" ? style.dark : style.light
                      }`}
                      onClick={increase}
                    >
                      +
                    </button>
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

                <div
                  className={`${style.productDescription} ${
                    theme === "light" ? style.dark : style.light
                  }`}
                >
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
