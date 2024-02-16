import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/apiSlice";
import style from '../Sales/Sales.module.css';
import { TitleBar } from "../TitleBar/TitleBar";
import { FilterBar } from './../FilterBar/FilterBar';

export const Sales = () => {
 const { data, error, isLoading } = useGetProductsQuery();
 const { minPrice, maxPrice, sort} = useSelector((state) => state.filter) //+
 const [ products, setProducts] = useState(data) //+

 useEffect(() => { //+
    const filteredProducts = data?.filter((products) => {
        return (
            (!minPrice || products.price >=Number(minPrice)) &&
            (!maxPrice || products.price <= Number(maxPrice))
        )
    })

const sortedProducts = sort === '' || sort === 'by default' ? //+
  filteredProducts : filteredProducts?.sort((a, b) => {
    if (sort === 'Ascending') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

setProducts(sortedProducts)
},[minPrice,maxPrice,sort, data])



 if (error) {
    return (
        <p className={style.errorFetching}>Error featching date: {error.message}</p>
    )
 }

 if (isLoading) {
    return (
        <p className={style.loadingData}>Loading...</p>
    )
 }

const discountedSales = data ? data.filter((sale) => sale.discont_price !== null) : [];

 const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
 };

 const randomlyDisplayedSales = shuffleArray(discountedSales).slice(0, 4);



return (
    <section className={style.salesCategoryWrapper}>
        <TitleBar title = "Sale" linkTo="/all-sales" buttonText="All Sales" />
        <FilterBar title = "Tools and equipment" />
        <section className={style.saleCardWrapper}>
            {randomlyDisplayedSales.map((sale) => (
                <Link
                key={sale.id}
                className={style.saleCard}
                to={`products/${sale.id}`}
                >
                <div className={style.saleBlock}>
                  {sale.price &&
                  sale.discont_price &&
                  `-${Math.round(
                    ((sale.price - sale.discont_price) / sale.price) * 100
                  )}%`}
                </div>
                <img className={style.saleImg}
                src={`http://localhost:3333${sale.image}`}
                alt={sale.title}
                />
                <h2 className={style.saleCardText}>
                    {sale.title}
                </h2>

                <div className={style.salePriceWrapper}>
                    <p className={style.realPrice}>${sale.discont_price}</p>
                      {sale.discont_price ? (
                  <p className={style.firstPrice}>${sale.price}</p>) : null}
                </div>
                </Link>
            ))}
        </section>
        <button className={style.saleBtnAdaptive}>
            <Link className={style.saleBtnDescription} to={'/all-sales'}>
                {'All Sales'}
            </Link>
        </button>
    </section>
)
}