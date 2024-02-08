import React from "react";
import { Link } from "react-router-dom";
import burgerMenu from "../../assets/images/HeaderMedia/burger-menu-right.svg";
import basket from "../../assets/images/HeaderMedia/headerBag.svg";
import logo from "../../assets/images/HeaderMedia/headerLogo.svg";
import classes from "./Header.module.css";

export const Header = () => {
    return (
        <div>
            <header>
                <img className={classes.logo} src={logo} alt="Logo" />
                <nav className={classes.navMenu}>
                    <ul className={classes.navList}>
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
                <div className={classes.basketWrapper}>
                    <Link to="basket">
                        <img src={basket} alt="Basket" />
                    </Link>
                    <img className={classes.burgerMenu} src={burgerMenu} alt="BurgerMenu" />
                </div>
            </header>
        </div>
    )
}