import { useParams } from "react-router-dom";
import { useGetCategoriesByIdQuery } from "../../slices/apiSlice";
import style from "./SingleCategoryPage.module.css";

export const SingleCategoryPage = () => {
    const { id } = useParams()
    const { data, error, isLoading } = useGetCategoriesByIdQuery(id)

    if (error) {
        return <h2>Error....</h2>
    }
    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <section className={style.singleCategoryWrapper}>
            <div className={style.singleBtnWrapper}></div>
            <div className={style.singleCategoryCardsWrapper}>
                {data.data && data.data.map((product) => (
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