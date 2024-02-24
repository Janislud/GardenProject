import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/apiSlice";
import { ProductsCard } from "../ProductsCard/ProductsCard";
import style from "../Sales/Sales.module.css";
import { TitleBar } from "../TitleBar/TitleBar";

export const Sales = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  if (error) {
    return (
      <p className={style.errorFetching}>
        Error featching date: {error.message}
      </p>
    );
  }

  if (isLoading) {
    return <p className={style.loadingData}>Loading...</p>;
  }

  const discountedSales = data
    ? data.filter((sale) => sale.discont_price !== null)
    : [];

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
      <TitleBar title="Sale" linkTo="/sales" buttonText="All Sales" />
      <section className={style.saleCardWrapper}>
        {randomlyDisplayedSales.map((sale) => (
          <ProductsCard key={sale.id} product={sale} />
        ))}
      </section>
      <button className={style.saleBtnAdaptive}>
        <Link className={style.saleBtnDescription} to={"/sales"}>
          {"All Sales"}
        </Link>
      </button>
    </section>
  );
};
