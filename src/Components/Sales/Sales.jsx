import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/apiSlice";
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

return (
    <section>
        <Line title = "Sale" linkTo="/all-sales" buttonText="All Sales" />

        <section className={style.saleCardWrapper}>
            {discountedSales.slice(0,4).map((sale) => (
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