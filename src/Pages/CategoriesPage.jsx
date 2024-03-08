import { AllCategories } from "../Components/AllCategories/AllCategories"
import style from "./CategoriesPage.module.css"

export const CategoriesPage = ({ isLoading }) => {

    if (isLoading) {
        return (
          <div className={style.loader}>
            <div className={style.loaderText}>Loading...</div>
            <div className={style.loaderAnimation}></div>
          </div>
        );
      }

    return (
        <main>
            <AllCategories /></main>
    )
}