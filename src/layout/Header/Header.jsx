import React from "react";
import { Link } from "react-router-dom";
import burgerMenu from "../../assets/images/HeaderMedia/burger-menu-right.svg";
import basket from "../../assets/images/HeaderMedia/headerBag.svg";
import logo from "../../assets/images/HeaderMedia/headerLogo.svg";
import styles from "./Header.module.css";

export const Header = () => {
    return (
        <div>
            <header>
                <img className={styles.logo} src={logo} alt="Logo" />
                <nav className={styles.navMenu}>
                    <ul className={styles.navList}>
                        <li>
                            <Link to='/main'>Main Page</Link>
                        </li>
                        <li>
                            <Link to='/categories'>Categories</Link>
                        </li>
                        <li>
                            <Link to='/all-products'>All products</Link>
                        </li>
                        <li>
                            <Link to='/all-sales'>All sales</Link>
                        </li>
                    </ul>
                </nav>
                <div className={styles.basketWrapper}>
                    <Link to="basket">
                        <img src={basket} alt="Basket" />
                    </Link>
                    <img className={styles.burgerMenu} src={burgerMenu} alt="BurgerMenu" />
                </div>
            </header>
        </div>
    )
}