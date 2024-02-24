import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../slices/apiSlice";
import style from "./AllCategories.module.css";
import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs";


export const AllCategories = () => {
    const { data, error, isLoading } = useGetCategoriesQuery()

    if (error) {
        return (<h2>"Что-то не так"</h2>)
    }
    if (isLoading) {
        return (<h2>Loading....</h2>)
    }
    const breadcrumbsData = {
        id: "all",
        title: "Categories"
    }

    return (
        <section className={style.allCategoriesWrapper}>
            <BreadCrumbs data={breadcrumbsData}/>
            <div className={style.buttonWrapper}>
                <Link to='/'>
                <button className={style.mainPageBtn}>Main page</button>
                </Link>
                <div className={style.lineDiv}></div>
                
                <button className={style.categoreisBtn}>Categories</button>
                
            </div>
            <h2 className={style.categoriesWrapperText}>Categories</h2>
            <section className={style.categoryCardsWrapper}>
                {data.map((category) => (
                    <Link key={category.id} className={style.categoryCard} to={`/categories/${category.id}`}>
                        <img className={style.categoryImg}
                            src={`http://localhost:3333${category.image}`}
                            alt={category.title} />
                        <h2 className={style.categoryCardText}>
                            {category.title}
                        </h2>
                    </Link>
                ))}
            </section>
        </section>
    )
}