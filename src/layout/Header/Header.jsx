import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { DiscountModal } from "../../Components/DiscountModal/DiscountModal";
import basket from "../../assets/images/HeaderMedia/headerBag.svg";
import logo from "../../assets/images/HeaderMedia/headerLogo.svg";
import heartWhite from "../../assets/images/LikesMedia/heartWhite.svg";
import cart from "../../assets/images/ThemaToggle/cart-dark-mode.svg";
import elipce from "../../assets/images/ThemaToggle/elipse-darkMode.svg";
import elipseLight from "../../assets/images/ThemaToggle/light-thema-circle.svg";
import moon from "../../assets/images/ThemaToggle/light-thema-moon.svg";
import sun from "../../assets/images/ThemaToggle/sun.svg";
import { toggleTheme } from "../../slices/themaSlice";
import style from "./Header.module.css";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const likeTotalQuantity = useSelector(
    (state) => state.likedProducts.likeTotalQuantity
  );
  const theme = useSelector((state) => state.theme.theme);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  return (
    <header className={`${style.headerWrapper} `}>
      <DiscountModal isOpen={isModalOpen} onRequestClose={toggleModal} />
      <div className={style.logoToggleWrapper}>
        <img className={style.logo} src={logo} alt="Logo" />
        <div
          className={`${style.themaWrapper} ${
            theme === "light" ? style.activeBg : ""
          }`}
        >
          <div className={style.themaDiv}>
            <img className={style.modeImg} src={sun} alt="sun" />
            <button
              className={`${style.modeBtn} ${
                theme === "dark" ? style.activeDarkMode : ""
              }`}
              onClick={toggleThemeHandler}
            >
              {theme === "dark" ? (
                <img src={elipseLight} alt="elipseLight" />
              ) : (
                <img src={elipce} alt="sun" />
              )}
            </button>
            <img className={style.modeImg} src={moon} alt="moon" />
          </div>
        </div>
      </div>
      <nav className={style.navMenu} onClick={toggleMenu}>
        <button className={style.discountButton} onClick={toggleModal}>
          1 day discount!
        </button>
        <ul
          className={`${style.navList} ${isOpen ? style.menuToggle : ""} ${
            theme === "light" ? style.dark : style.light
          }`}
        >
          <li
            className={`${style.listStyle} ${
              theme === "light" ? style.dark : style.light
            }`}
          >
            <Link
              to="/"
              className={`${style.listStyleMain} ${
                location.pathname === "/" ? style.active : ""
              }`}
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
              className={`${style.listStyleCategories} ${
                location.pathname === "/categories" ? style.active : ""
              }`}
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
              className={`${style.listStyleProducts} ${
                location.pathname === "/products" ? style.active : ""
              }`}
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
              className={`${
                location.pathname === "/sales" ? style.active : ""
              } ${style.listStyleSales}`}
            >
              All sales
            </Link>
          </li>
          <li
            className={`${style.listStyle} ${
              theme === "light" ? style.dark : style.light
            }`}
          >
            <button
              className={style.discountButtonToggle}
              onClick={toggleModal}
            >
              1 day discount!
            </button>
          </li>
        </ul>
      </nav>
      <div className={style.basketWrapper}>
        <Link className={style.toCart} to="/cart">
          <div className={style.cartTotalQuantity}>{totalQuantity}</div>
          <div className={style.divBasketWrapper}></div>
        </Link>

        <Link className={style.toLikedProducts} to="/favorites">
          <div className={style.likeTotalQuantity}>{likeTotalQuantity}</div>
          <img className={style.heartWhite} src={heartWhite} alt="Heart" />
        </Link>

        <Link className={style.cartToCart} to="/cart">
          {theme === "light" ? (
            <img src={cart} alt="cartDarkMode" />
          ) : (
            <img src={basket} alt="cartLightMode" />
          )}
        </Link>
        <div
          onClick={toggleMenu}
          className={`${style.burger} ${isOpen ? style.burger_active : ""} `}
        >
          <span
            className={`${style.burger_line} ${style.burger_line_first} ${
              theme === "light" ? style.light : style.dark
            }`}
          ></span>
          <span
            className={`${style.burger_line} ${style.burger_line_second} ${
              theme === "light" ? style.light : style.dark
            }`}
          ></span>
          <span
            className={`${style.burger_line} ${style.burger_line_third} ${
              theme === "light" ? style.light : style.dark
            }`}
          ></span>
          <span
            className={`${style.burger_line} ${style.burger_line_fourth} ${
              theme === "light" ? style.light : style.dark
            }`}
          ></span>
        </div>
      </div>
    </header>
  );
};
