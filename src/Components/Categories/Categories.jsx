import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../slices/apiSlice";
import style from "../Categories/Categories.module.css";
import { Line } from "../Line/Line";


export const Categories = () => {
  const [ categories, setCategories ] = useState([]);
  const { data, error, isLoading } = useGetCategoriesQuery();

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
        setCategories(data)
    }
},[isLoading,data,error])

  return (
    <section>
      <Line title = "Categories" linkTo="/categories" buttonText="All Categories" />

      <section className={style.categoryCardsWrapper}>
      {categories.slice(0,4).map((category) => (
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
}