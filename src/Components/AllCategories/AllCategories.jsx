import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../slices/apiSlice";
import styles from "./AllCategories.module.css";


export const AllCategories = () => {
    const { data, error, isLoading } = useGetCategoriesQuery()

    if (error) {
        return (<h2>"Что-то не так"</h2>)
    }
    if (isLoading) {
        return (<h2>Loading....</h2>)
    }
    

    return (
        <section className={styles.allCategoriesWrapper}>
            <div className={styles.buttonWrapper}>
                <Link to='/'>
                <button className={styles.mainPageBtn}>Main page</button>
                </Link>
                <div className={styles.lineDiv}></div>
                
                <button className={styles.categoreisBtn}>Categories</button>
                
            </div>
            <h2 className={styles.categoriesWrapperText}>Categories</h2>
            <section className={styles.categoryCardsWrapper}>
                {data.map((category) => (
                    <Link key={category.id} className={styles.categoryCard} to={`/single-category/${category.id}`}>
                        <img className={styles.categoryImg}
                            src={`http://localhost:3333${category.image}`}
                            alt={category.title} />
                        <h2 className={styles.categoryCardText}>
                            {category.title}
                        </h2>
                    </Link>
                ))}
            </section>
        </section>
    )
}