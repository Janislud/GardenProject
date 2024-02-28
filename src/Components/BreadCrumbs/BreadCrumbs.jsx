import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setBreadcrumbs } from "../../slices/breadcrumbsSlice";
import style from "./BreadCrumbs.module.css";

const BreadCrumbs = ({ data }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const breadcrumbs = useSelector((state) => state.breadcrumbs.breadcrumbsList);
  const { state } = location;
  const theme = useSelector((state) => state.theme.theme)
  
  let routesMap = {
    categories: "Categories",
  };

  const categoriesMap = {
    1: "Annuals",
    2: "Nursery",
    3: "Garden Art",
    4: "Plant Care",
    5: "Seasonal",
  };
  if (data) {
    const newBreadcrumb = { [data.id]: data.title };
    routesMap = { ...routesMap, ...newBreadcrumb };
  }

  const defaultPath = { name: "Main page", path: "" };

  const singleProductsBreadcrumbs = {
    "/products": [defaultPath, { name: "All Products", path: "products" }],
    "/sales": [defaultPath, { name: "All Sales", path: "sales" }],
    
   
    default: [
      defaultPath,
      { name: "Categories", path: "categories" },
      {
        name: categoriesMap[data?.categoryId],
        path: `categories/${data?.categoryId}`,
      },
    ],
  };

  // Обновляет хлебные крошки в зависимости от текущего маршрута
useEffect(() => {
  const pathnames = location.pathname.split("/").filter((x) => x); // Фильтруем пустые пути

  // Удаляем последний элемент, если он пустой
  if (pathnames.length > 1 && pathnames[pathnames.length - 1] === "") {
    pathnames.pop();
  }

  let newBreadcrumbs = [];

  if (!pathnames.includes("products")) { // Проверяем, нет ли в текущем пути "products"
    newBreadcrumbs = pathnames.map((pathname, index) => {
      return {
        name: routesMap[pathname],
        path: index === pathnames.length - 1 ? '' : pathname, // Оставляем пустой путь только для последнего элемента
      };
    });
  }

  if (pathnames.includes("products")) {
    if (data) {
      // Создаем крошку для товара по его id
      const productBreadcrumb = {
        name: `${data.title}`,
        path: `products/${data.title}`,
      };

      const breadcrumbs = state.prevPath.includes("categories")
        ? singleProductsBreadcrumbs["default"]
        : singleProductsBreadcrumbs[state.prevPath];
      dispatch(setBreadcrumbs([...breadcrumbs, ...newBreadcrumbs, productBreadcrumb]));
    } else {
      dispatch(setBreadcrumbs([...singleProductsBreadcrumbs["/products"]]));
    }
  } else if (pathnames.includes("sales")) {
    dispatch(setBreadcrumbs([...singleProductsBreadcrumbs["/sales"]]));
  } else {
    dispatch(setBreadcrumbs([defaultPath, ...newBreadcrumbs]));
  }
}, [location, dispatch, data]);

return (
  <div className={`${style.buttonWrapper} ${theme === 'light' ? style.dark : style.light}`}>
    <div className={style.flexDivs}>
      {breadcrumbs.map((breadcrumb, index) => (
        index !== breadcrumbs.length - 1 ? (
          <Link
            className={`${theme === 'light' ? style.dark : style.light} ${location.pathname.includes(breadcrumb.path) ? style.currentBreadcrumb : ''}`}
            to={`/${breadcrumb.path}`}
            key={index}
          >
            <div className={style.divBorder}>{breadcrumb.name}</div>
            <div className={`${style.line} ${theme === 'light' ? style.dark : style.light}`}></div>
          </Link>
        ) : (
          <div className={style.divBorder} key={index}>{breadcrumb.name}</div>
        )
      ))}
      <div className={`${style.lineDiv} ${theme === 'light' ? style.dark : style.light}`}></div>
    </div>
  </div>
);

};

export { BreadCrumbs };

