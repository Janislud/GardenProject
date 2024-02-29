import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import basket from "../../assets/images/HeaderMedia/headerBag.svg";
import logo from "../../assets/images/HeaderMedia/headerLogo.svg";
import heartWhite from "../../assets/images/LikesMedia/heartWhite.svg";
import circle from "../../assets/images/ThemaToggle/light-thema-circle.svg";
import moon from "../../assets/images/ThemaToggle/light-thema-moon.svg";
import style from "./Header.module.css";

export const Header = ({ toggleThemeHandler }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const likeTotalQuantity = useSelector(
    (state) => state.likedProducts.likeTotalQuantity
  );
  const theme = useSelector((state) => state.theme.theme);
  const color = useSelector((state) => state.theme.color);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`${style.headerWrapper} `}>
      <div className={style.logoToggleWrapper}>
        <img className={style.logo} src={logo} alt="Logo" />
        <div className={style.themaWrapper}>
          <div className={style.themaDiv}>
            <button onClick={toggleThemeHandler}>
              <img className={style.switch} src={circle} alt="backgroundBtn" />
            </button>
            <button>
              <img src={moon} alt="moon" />
            </button>
          </div>
        </div>
      </div>
      <nav className={style.navMenu} onClick={toggleMenu}>
        <ul className={`${style.navList} ${isOpen ? style.menuToggle : ""}`}>
          <li
            className={`${style.listStyle} ${
              theme === "light" ? style.dark : style.light
            }`}
          >
            <Link
              to="/"
              className={location.pathname === "/" ? style.active : ""}
            >
              Main Page
            </Link>
          </li>
          <li
            className={`${style.listStyle} ${
              theme === "light" ? style.dark : style.light
            }`}
          >
            <Link
              to="/categories"
              className={
                location.pathname === "/categories" ? style.active : ""
              }
            >
              Categories
            </Link>
          </li>
          <li
            className={`${style.listStyle} ${
              theme === "light" ? style.dark : style.light
            }`}
          >
            <Link
              to="/products"
              className={location.pathname === "/products" ? style.active : ""}
            >
              All products
            </Link>
          </li>
          <li
            className={`${style.listStyle} ${
              theme === "light" ? style.dark : style.light
            }`}
          >
            <Link
              to="/sales"
              className={location.pathname === "/sales" ? style.active : ""}
            >
              All sales
            </Link>
          </li>
        </ul>
      </nav>

      <div className={style.basketWrapper}>
        <Link className={style.toCart} to="/cart">
          <div className={style.cartTotalQuantity}>{totalQuantity}</div>

          <div className={style.basketWrapper}></div>
        </Link>
        <Link className={style.toLikedProducts} to="/liked-products">
          <div className={style.likeTotalQuantity}>{likeTotalQuantity}</div>
          <img src={heartWhite} alt="Heart" />
        </Link>
        <Link to="/cart">
          <img src={basket} alt="Basket" />
        </Link>
        <div
          onClick={toggleMenu}
          className={`${style.burger} ${isOpen ? style.burger_active : ""}`}
        >
          <span
            className={`${style.burger_line} ${style.burger_line_first}`}
          ></span>
          <span
            className={`${style.burger_line} ${style.burger_line_second}`}
          ></span>
          <span
            className={`${style.burger_line} ${style.burger_line_third}`}
          ></span>
          <span
            className={`${style.burger_line} ${style.burger_line_fourth}`}
          ></span>
        </div>
      </div>
    </header>
  );
};
