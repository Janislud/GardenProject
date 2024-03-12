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
  const theme = useSelector((state) => state.theme.theme);

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
    "/categories": [defaultPath, { name: "Categories", path: "categories" }],
    "/products": [defaultPath, { name: "All Products", path: "products" }],
    "/sales": [defaultPath, { name: "All Sales", path: "sales" }],
    "/favorites": [defaultPath, { name: "Favourites", path: "favorites" },],

    default: [
      defaultPath,
      { name: "Categories", path: "categories" },
      {
        name: categoriesMap[data?.categoryId],
        path: `categories/${data?.categoryId}`,
      },
    ],
  };

  useEffect(() => {
    const pathnames = location.pathname.split("/").filter((x) => x); // Фильтруем пустые пути

    // Удаляем последний элемент, если он пустой
    if (pathnames.length > 1 && pathnames[pathnames.length - 1] === "") {
      pathnames.pop();
    }

    let newBreadcrumbs = [];

    if (!pathnames.includes("products")) {
      // Проверяем, нет ли в текущем пути "products"
      newBreadcrumbs = pathnames.map((pathname, index) => {
        return {
          name: routesMap[pathname],
          path: index === pathnames.length - 1 ? "" : pathname, // Оставляем пустой путь только для последнего элемента
        };
      });
    }

    if (pathnames.includes("products")) {
      if (data) {
        // Создаем крошку для товара по его id
        const productBreadcrumb = {
          name: `${data.title}`,
          path: `products/${encodeURIComponent(data.title)}`,
        };

        const currentBreadcrumbs =
          state && state.prevPath && state.prevPath.includes("categories")
            ? singleProductsBreadcrumbs["default"]
            : singleProductsBreadcrumbs[state?.prevPath || "/products"];

        dispatch(
          setBreadcrumbs([...(currentBreadcrumbs || []), ...newBreadcrumbs, productBreadcrumb])
        );
      } else {
        dispatch(setBreadcrumbs([...singleProductsBreadcrumbs["/products"]]));
      }
    } else if (pathnames.includes("sales")) {
      dispatch(setBreadcrumbs([...singleProductsBreadcrumbs["/sales"]]));
    } else if (pathnames.includes("favorites")) {
      dispatch(setBreadcrumbs([...singleProductsBreadcrumbs["/favorites"]]));
    } else {
      dispatch(setBreadcrumbs([defaultPath, ...newBreadcrumbs]));
    }
  }, [location, dispatch, data, state]);

  return (
    <div
      className={style.buttonWrapper}
    >
      <div className={style.flexDivs}>
        {breadcrumbs && breadcrumbs.map && breadcrumbs.map((breadcrumb, index) =>
          index !== breadcrumbs.length - 1 ? (
            <Link
              className={`${theme === "light" ? style.dark : style.light}`}
              to={`/${breadcrumb.path}`}
              key={index}
            >
              <div
                className={`${style.divBorder} ${location.pathname === `/${breadcrumb.path}`
                    ? style.active
                    : ""
                  }`}
              >
                {breadcrumb.name}
              </div>
              <div
                className={style.line}
              ></div>
            </Link>
          ) : (
            <div
              className={`${style.divBorder} ${location.pathname === `/${breadcrumb.path}` ? style.active : ""
                }`}
              key={index}
            >
              {breadcrumb.name}
            </div>
          )
        )}
        <div
          className={style.lineDiv}
        ></div>
      </div>
    </div>
  );
};

export { BreadCrumbs };
