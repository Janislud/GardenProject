import React, { useState } from 'react';
import { Link, useLocation, } from 'react-router-dom';
import basket from '../../assets/images/HeaderMedia/headerBag.svg';
import logo from '../../assets/images/HeaderMedia/headerLogo.svg';
import styles from './Header.module.css';


export const Header = () => {

    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <header className={styles.headerWrapper}>
            <img className={styles.logo} src={logo} alt='Logo' />
            <nav className={styles.navMenu} onClick={toggleMenu}>
                <ul className=
                    {`${styles.navList} ${isOpen ? styles.menuToggle : ''}`}>
                    <li className={styles.listStyle}>
                        <Link to='/' className={location.pathname === '/' ? styles.active : ''}>Main Page</Link>
                    </li>
                    <li className={styles.listStyle}>
                        <Link to='/categories' className={location.pathname === '/categories' ? styles.active : ''}>Categories</Link>
                    </li>
                    <li className={styles.listStyle}>
                        <Link to='/all-products' className={location.pathname === '/all-products' ? styles.active : ''}>All products</Link>
                    </li>
                    <li className={styles.listStyle}>
                        <Link to='/all-sales' className={location.pathname === '/all-sales' ? styles.active : ''}>All sales</Link>
                    </li>
                </ul>
            </nav>
            <div className={styles.basketWrapper}>
                <Link to='/cart'>
                    <img src={basket} alt='Basket' />
                </Link>
                <div onClick={toggleMenu} className={`${styles.burger} ${isOpen ? styles.burger_active : ''}`}>
                    <span className={`${styles.burger_line} ${styles.burger_line_first}`}></span>
                    <span className={`${styles.burger_line} ${styles.burger_line_second}`}></span>
                    <span className={`${styles.burger_line} ${styles.burger_line_third}`}></span>
                    <span className={`${styles.burger_line} ${styles.burger_line_fourth}`}></span>
                </div>
            </div>
        </header >
    )
}
