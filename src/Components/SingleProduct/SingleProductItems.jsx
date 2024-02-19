import React from "react";
import { Link } from "react-router-dom";
import style from "./singleProduct.module.css";

export const SingleProductItem = () => {
  return (
    <div className={style.mainCategoriesToolsButtons}>
      <Link to="/">
        <button className={style.mainButton}>Main Page</button>
      </Link>
      <div className={style.shortLine}></div>
      <Link to="/categories">
        <button className={style.categoryButton}>Categories</button>
      </Link>
      <div className={style.shortLine}></div>
      <Link to="/all-products">
        <button className={style.toolsButton}>All Products</button>
      </Link>
    </div>
  );
};
