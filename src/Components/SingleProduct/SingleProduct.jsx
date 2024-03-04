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

export const SingleProduct = ({ product }) => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProductByIdQuery(id);
  const [space, setSpace] = useState(false);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [isAddedToLikedProducts, setIsAddedToLikedProducts] = useState(false);

  /**const likedProducts = useSelector(
    (state) => state.likedProducts.likedProducts
  );

  const [isLiked, setIsLiked] = useState(
    likedProducts.some((item) => item.id === id)
  );*/

  const [isHoveredLikes, setIsHoveredLikes] = useState(false);
  const theme = useSelector((state) => state.theme.theme);

  const isLiked = useSelector((state) =>
    state.likedProducts.likedProducts.some((product) => product.id === id)
  );

  const increase = () => {
    setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(
      addProductToCart({
        ...product,
        quantity: parseInt(quantity),
        price: product.price,
      })
    );
  };

  const switcherText = (event) => {
    event.preventDefault();
    setSpace((prevSpace) => !prevSpace);
  };

  if (error) {
    return (
      <p className={style.featchingDate}>
        Error featching date: {error.message}
      </p>
    );
  }

  if (isLoading) {
    return <p className={style.featchingDate}>Loading...</p>;
  }

  function calculateDiscountPercent(price, discountPrice) {
    return Math.round(((price - discountPrice) / price) * 100);
  }

  const handleAddToLikedProduct = (product) => {
    const { id, image, title, price, discont_price } = product;
    //event.stopPropagation();
    //event.preventDefault();
    if (isLiked) {
      dispatch(deleteFromLikedProducts(id));
    } else {
      dispatch(addToLikedProducts({ id, image, title, price, discont_price }));
    }
    dispatch(getLikedProductsQuantity());
    setIsAddedToLikedProducts(true);
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

                <div className={style.titleAndHeart}>
                  <h2 className={style.h2TitleText} ${theme === 'light' ? style.dark : style.light}`}>{product.title}</h2>
                  <button
                    className={style.buttonIcon}
                    onClick={handleAddToLikedProduct}
                    onMouseEnter={() => {
                      if (!isAddedToLikedProducts) {
                        setIsHoveredLikes(true);
                      }
                    }}
                    onMouseLeave={() => {
                      // Если товар уже добавлен в корзину, игнорируем изменение изображения при уходе курсора
                      if (!isAddedToLikedProducts) {
                        setIsHoveredLikes(false);
                      }
                    }}
                  >
                    <img
                      className={style.heartIcon}
                      src={
                        isLiked
                          ? heartRed
                          : isHoveredLikes
                          ? heartRed
                          : heartWhite
                      }
                      alt="heartIcon"
                    />
                  </button>
                </div>

                <div className={style.divPrices}>
                  <p className={`${style.discontPrice} ${theme === 'light' ? style.dark : style.light}`}>${product.discont_price ? product.discont_price : product.price}</p>

                  {product.discont_price ? (
                    <p className={style.initialPrice}>${product.price}</p>
                  ) : null}

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
                    <button className={style.minusButton} onClick={decrease}>
                      -
                    </button>
                    <input
                      className={style.countInput}
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                    <button className={style.plusButton} onClick={increase}>
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
