import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../slices/apiSlice";
import style from "../Categories/Categories.module.css";
import { TitleBar } from './../TitleBar/TitleBar';

export const Categories = () => {

  const { data, error, isLoading } = useGetCategoriesQuery();

  if(error) {
    return (
      <p className={style.errorFetching}>Error fetching  date: {error.message}</p>
    )
  };

  if (isLoading) {
    return (
      <p className={style.loadingData}>Loading...</p>
    )
  };

  return (
    <section className={style.categoriesSection}>
      <TitleBar title = "Categories" linkTo="/categories" buttonText="All Categories" />

      <section className={style.categoryCardsWrapper}>
      {data && data.slice(0,4).map((category) => (
        <Link key={category.id} className={style.categoryCard}
        to={`/categories/${category.id}`}
        >
          <img
          className={style.categoryImg}
          src={`http://localhost:3333${category.image}`}
          alt={category.title}
          />
          <h2 className={style.categoryCardText}>
            {category.title}
          </h2>
        </Link>
      ))}
   
    </section>
       <button className={style.categoryBtnAdaptive}>
        <Link className={style.categoryBtnDescription}
        to="/categories">
          {"All Categoris"}
        </Link>
      </button>
    </section>
    
  )
};