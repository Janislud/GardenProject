import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useGetCategoriesByIdQuery } from "../../slices/apiSlice";
import { FilterBar } from "../FilterBar/FilterBar";
import style from "./SingleCategoryPage.module.css";

export const SingleCategoryPage = () => {
    const { id } = useParams()
    const { data, error, isLoading } = useGetCategoriesByIdQuery(id)
    const { minPrice, maxPrice, sort ,showOnlyDiscounted} = useSelector((state) => state.filter) //+
    const [ products, setProducts] = useState([]) //+

useEffect(() => {

        if (data && data.data) {
            let filteredProducts = data.data;
            
            if (showOnlyDiscounted) {
                filteredProducts = filteredProducts.filter((product) => product.discont_price);
            }
            
            filteredProducts = filteredProducts.filter((product) => (
                (!minPrice || product.price >= Number(minPrice)) &&
                (!maxPrice || product.price <= Number(maxPrice))
            ));

      const sortedProducts =
        sort === "" || sort === "by default"
          ? filteredProducts
          : filteredProducts.sort((a, b) => {
              return sort === "Ascending"
                ? b.price - a.price
                : a.price - b.price;
            });

      setProducts(sortedProducts);
    }
  }, [data, minPrice, maxPrice, sort, showOnlyDiscounted]);

  if (error) {
    return <h2>Error....</h2>;
  }
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

    return (
        <section className={style.singleCategoryWrapper}>
            <div className={style.singleBtnWrapper}></div>
            <FilterBar title = "Annuals" />
            <div className={style.singleCategoryCardsWrapper}>
                {products.map((product) => (
                    <div className={style.singleCardWrapper} key={product.id}>
                        <div className={style.sale + (product.discont_price ? ' ' + style.saleBox : '')}>{product.price &&
                            product.discont_price &&
                            `-${Math.round(
                                ((product.price - product.discont_price) / product.price) * 100)}%`}
                        </div>
                        <img className={style.singleCardImg}
                            src={`http://localhost:3333${product.image}`}
                            alt={product.title} />
                            <div className={style.titlePriceWrapper}>
                        <div className={style.productTitle}>{product.title}</div>
                        <div className={style.priceBox}>
                            <h2 className={style.newPrice}>${product.price}</h2>
                            <p className={style.firstPrice}>
                                {product.discont_price ? '$' + product.discont_price : null}
                            </p>
                        </div>
                    </div>
                    </div>
                ))}
            </div>
        </section>
    )
}