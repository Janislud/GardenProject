import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import heartRed from "../../assets/images/LikesMedia/heartRed.svg";
import heartWhite from "../../assets/images/LikesMedia/heartWhite.svg";
import { useGetProductByIdQuery } from "../../slices/apiSlice";
import { addProductToCart } from "../../slices/cartSlice";
import {
  addToLikedProducts,
  deleteFromLikedProducts,
} from "../../slices/likedProductsSlice";
import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs";
import { Button } from "../Button/Button";
import style from "./singleProduct.module.css";

export const SingleProduct = () => {
  const { id: routeId } = useParams();
  const { data, error, isLoading } = useGetProductByIdQuery(routeId);
  const [space, setSpace] = useState(false);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [showImageModal, setShowImageModal] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  const likedItems = useSelector((state) => state.likedProducts.likedProducts);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (data && data.length > 0) {
      const isAlreadyAddedToLiked = likedItems.some(
        (item) => item.id === data[0].id
      );
      setIsLiked(isAlreadyAddedToLiked);
    }
  }, [data, likedItems]);

  const increase = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (data && data.length > 0) {
      dispatch(addProductToCart({ ...data[0], quantity }));
    }
  };

  const switcherText = (event) => {
    event.preventDefault();
    setSpace((prevSpace) => !prevSpace);
  };

  const toggleImageModal = () => setShowImageModal(!showImageModal);

  const ImageModal = ({ src, alt }) => (
    <div className={style.imageModal} onClick={toggleImageModal}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} className={style.modalImage} />
      </div>
    </div>
  );

  const handleAddToLikedProduct = (event) => {
    event.preventDefault();

    if (data && data.length > 0) {
      if (isLiked) {
        dispatch(deleteFromLikedProducts(data[0]));
      } else {
        dispatch(addToLikedProducts(data[0]));
      }
    }
  };

  function calculateDiscountPercent(price, discountPrice) {
    return Math.round(((price - discountPrice) / price) * 100);
  }

  return (
    <>
      {error && (
        <p className={style.featchingDate}>
          Error fetching data: {error.message}
        </p>
      )}

      {isLoading && <p className={style.featchingDate}>Loading...</p>}

      {data && data.length > 0 && (
        <>
          <BreadCrumbs data={data[0]} />
          <section className={style.mainDivSingleProduct}>
            <section className={style.divSingleProduct}>
              <div key={data[0].id} className={style.saleBlock}>
                <div
                  className={style.productItemImage}
                  onClick={toggleImageModal}
                >
                  <img
                    className={style.imgProduct}
                    src={`http://localhost:3333${data[0].image}`}
                    alt={data[0].title}
                  />
                  {showImageModal && (
                    <ImageModal
                      src={`http://localhost:3333${data[0].image}`}
                      alt={data[0].title}
                    />
                  )}
                </div>

                <div className={style.divWithPriceCounterDescription}>
                  <div className={style.titleAndHeart}>
                    <h2
                      className={`${style.h2TitleText} ${
                        theme === "light" ? style.dark : style.light
                      }`}
                    >
                      {data[0].title}
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
                      {data[0].discont_price
                        ? data[0].discont_price
                        : data[0].price}
                    </p>

                    {data[0].discont_price && (
                      <p className={style.initialPrice}>${data[0].price}</p>
                    )}

                    {data[0].price &&
                      data[0].discont_price &&
                      data[0].price !== data[0].discont_price && (
                        <div className={style.percentagePrice}>
                          -
                          {calculateDiscountPercent(
                            data[0].price,
                            data[0].discont_price
                          )}
                          %
                        </div>
                      )}
                  </div>

                  <div className={style.counterAndButton}>
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
                        className={style.addGreenButtonSingle}
                        buttonClass="addGreenButtonSingle"
                        text="Add to cart"
                        onClick={handleAddToCart}
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
                      {data[0].description}
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
            </section>
          </section>
        </>
      )}
    </>
  );
};
