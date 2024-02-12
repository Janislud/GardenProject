import React, { useState } from "react";
import { Link } from "react-router-dom";
import burgerMenu from "../../assets/images/HeaderMedia/burger-menu-right.svg";
import basket from "../../assets/images/HeaderMedia/headerBag.svg";
import logo from "../../assets/images/HeaderMedia/headerLogo.svg";
import styles from "./Header.module.css";

export const Header = () => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <header>
            <img className={styles.logo} src={logo} alt="Logo" />
            <nav className={styles.navMenu}>
                <ul className={`${styles.navList} ${styles.menuToggleVisible}  ${isOpen ? styles.menuToggle : ''}`}>
                    <li className={styles.listStyle}>
                        <Link to='/main'>Main Page</Link>
                    </li>
                    <li className={styles.listStyle}>
                        <Link to='/categories'>Categories</Link>
                    </li>
                    <li className={styles.listStyle}>
                        <Link to='/all-products'>All products</Link>
                    </li>
                    <li className={styles.listStyle}>
                        <Link to='/all-sales'>All sales</Link>
                    </li>
                </ul>
            </nav>
            <div className={styles.basketWrapper}>
                <Link to="/basket">
                    <img src={basket} alt="Basket" />
                </Link>
                <img className={styles.burgerMenu} src={burgerMenu} alt="BurgerMenu" onClick={toggleMenu}  />

            </div>
        </header>
    )
}
