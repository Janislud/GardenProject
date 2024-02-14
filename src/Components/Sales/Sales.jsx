import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/apiSlice";
import { FilterBar } from "../FilterBar/FilterBar";
import { Line } from "../Line/Line";
import style from '../Sales/Sales.module.css';

export const Sales = () => {
 const { data, error, isLoading } = useGetProductsQuery();
 const [ sales, setSales] = useState([]);

useEffect(() => {
    if (error) {
        console.log("Error fetchig data:" , error);
    }
},[error]);

useEffect(() => {
    if (isLoading) {
        console.log("Loading");
    } else if (data) {
        console.log("Data:",data)
        setSales(data)
    }
},[isLoading,data,error])

const discountedSales = sales.filter((sale) => sale.discont_price !== null);

 const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
 };

 const randomlyDisplayedSales = shuffleArray(discountedSales).slice(0, 4);

return (
    <section>
        <Line title = "Sale" linkTo="/all-sales" buttonText="All Sales" />

          <FilterBar title='Tools and equipment'/>

        <section className={style.saleCardWrapper}>
            {randomlyDisplayedSales.map((sale) => (
                <Link
                key={sale.id}
                className={style.saleCard}
                to={``}
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