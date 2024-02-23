import React, { useState } from 'react';
import { Link, useLocation, } from 'react-router-dom';
import basket from '../../assets/images/HeaderMedia/headerBag.svg';
import logo from '../../assets/images/HeaderMedia/headerLogo.svg';
import like from '../../assets/images/HeaderMedia/like.svg';
import style from './Header.module.css';
import circle from '../../assets/images/ThemaToggle/light-thema-circle.svg';
import moon from '../../assets/images/ThemaToggle/light-thema-moon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../slices/themaSlice';
import sun from '../../assets/images/ThemaToggle/sun.svg'

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const theme = useSelector(state => state.theme.mode)
    const dispatch = useDispatch()

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const toggleThemeHandler = () => {
        dispatch(toggleTheme())
    }

    return (
        <header className={style.headerWrapper}>
            <div className={style.logoToggleWrapper}>
                <img className={style.logo} src={logo} alt='Logo' />
                <div className={style.themaWrapper}>
                    <div className={style.themaDiv}>
                        <img className={`${style.switch} ${theme === 'light' ? style.light : style.dark} `} src={circle} alt="backgroundBtn" onClick={toggleThemeHandler} />
                        <img src={moon} alt="moon" />
                    </div>
                </div>
            </div>
            <nav className={style.navMenu} onClick={toggleMenu}>
                <ul className=
                    {`${style.navList} ${isOpen ? style.menuToggle : ''}`}>
                    <li className={style.listStyle}>
                        <Link to='/' className={location.pathname === '/' ? style.active : ''}>Main Page</Link>
                    </li>
                    <li className={style.listStyle}>
                        <Link to='/categories' className={location.pathname === '/categories' ? style.active : ''}>Categories</Link>
                    </li>
                    <li className={style.listStyle}>
                        <Link to='/all-products' className={location.pathname === '/all-products' ? style.active : ''}>All products</Link>
                    </li>
                    <li className={style.listStyle}>
                        <Link to='/all-sales' className={location.pathname === '/all-sales' ? style.active : ''}>All sales</Link>
                    </li>
                </ul>
            </nav>
            <div className={style.basketWrapper}>
                <Link to='/like'>
                    <img src={like} alt="Heart" />
                </Link>
                <Link to='/cart'>
                    <img src={basket} alt='Basket' />
                </Link>
                <div onClick={toggleMenu} className={`${style.burger} ${isOpen ? style.burger_active : ''}`}>
                    <span className={`${style.burger_line} ${style.burger_line_first}`}></span>
                    <span className={`${style.burger_line} ${style.burger_line_second}`}></span>
                    <span className={`${style.burger_line} ${style.burger_line_third}`}></span>
                    <span className={`${style.burger_line} ${style.burger_line_fourth}`}></span>
                </div>
            </div>
        </header >
    )
}
