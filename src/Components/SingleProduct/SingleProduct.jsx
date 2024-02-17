import { Link, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../slices/apiSlice";
import { Button } from "../Button/Button";
import Counter from "./CounterForProduct";
import style from "./singleProduct.module.css";

export const SingleProduct = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProductByIdQuery(id);

  if (error) {
    return <p>Error featching date: {error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className={style.mainDivSingleProduct}>
      <section className={style.divSingleProduct}>
        {data.map((sale) => (
          <div
            key={sale.id}
            className={style.saleBlock}
            to={`sales/${sale.id}`}
          >
            <div className={style.productItemImage}>
              <img
                className={style.imgProduct}
                src={`http://localhost:3333${sale.image}`}
                alt={sale.title}
              />
            </div>

            <div className={style.divWithPriceCounterDescription}>
              <h2 className={style.h2TitleText}>{sale.title}</h2>
              <div className={style.divPrices}>
                <p className={style.discontPrice}>${sale.discont_price}</p>

                {sale.discont_price ? (
                  <p className={style.initialPrice}>${sale.price}</p>
                ) : null}

                <div className={style.percentagePrice}>
                  {sale.price &&
                    sale.discont_price &&
                    `-${Math.round(
                      ((sale.price - sale.discont_price) / sale.price) * 100
                    )}%`}
                </div>
              </div>

              <div className={style.counterUndButton}>
                <div className={style.counter}>
                  <Counter />
                </div>
                <div className={style.divButton}>
                  <Link to="/shopping-cart">
                    <Button
                      className={style.addGreenButton}
                      buttonClass="primary"
                      text="Add to cart"
                    />
                  </Link>
                </div>
              </div>

              <div className={style.productDescription}>
                <h6 className={style.h6Description}>Description</h6>
                <p className={style.textColor}>{sale.description}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};

//{products.length > 0 ? products[0].description : ""}
