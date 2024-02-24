import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { setBreadcrumbs } from "../../slices/breadcrumbsSlice";
import style from "./BreadCrumbs.module.css";

const BreadCrumbs = ({ data }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const breadcrumbs = useSelector((state) => state.breadcrumbs.breadcrumbsList);
  const { state } = location;

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
    const pathnames = location.pathname.split("/").filter((x) => x);
    const newBreadcrumbs = pathnames.map((pathname) => {
      return {
        name: routesMap[pathname],
        path: pathname,
      };
    });

    if (pathnames.includes("products")) {
      if (data) {
        const breadcrumbs = state.prevPath.includes("categories")
          ? singleProductsBreadcrumbs["default"]
          : singleProductsBreadcrumbs[state.prevPath];
        dispatch(setBreadcrumbs([...breadcrumbs, ...newBreadcrumbs]));
      } else {
        dispatch(setBreadcrumbs([...singleProductsBreadcrumbs["/products"]]));
      }
    } else if (pathnames.includes("sales")) {
      dispatch(setBreadcrumbs([...singleProductsBreadcrumbs["/sales"]]));
    } else {
      dispatch(setBreadcrumbs([defaultPath, ...newBreadcrumbs]));
    }
  }, [location, dispatch]);

  return (
    <div className={style.buttonWrapper}>
      <div>
        {breadcrumbs.map((breadcrumb, index) => (
          <Link to={`/${breadcrumb.path}`} key={index}>
            <div>{breadcrumb.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export { BreadCrumbs };
