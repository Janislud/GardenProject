import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AllCategories } from "../Components/AllCategories/AllCategories"
import { setBreadcrumbs } from "../slices/breadcrumbsSlice"
import {BreadCrumbs} from "../Components/BreadCrumbs/BreadCrumbs"

export const CategoriesPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setBreadcrumbs([
            {name: 'Home', path: '/'},
            {name: 'Categories', path: '/categories'}
        ]))
    },[])
    return (
        <main>
            <BreadCrumbs/>
            <AllCategories /></main>
    )
}