import { useDispatch, useSelector } from "react-redux";
import style from "./MainPage.module.css";
import { useEffect, useState } from "react";
import { Categories } from "../Components/Categories/Categories";
import { DataUserForm } from "../Components/DataUserForm/DataUserForm";
import { MainBanner } from "../Components/MainBanner/MainBanner";
import { Sales } from "../Components/Sales/Sales";
import { toggleTheme } from "../slices/themaSlice";

export const MainPage = ({ toggleThemeHandler }) => {
  const theme = useSelector(state => state.theme.theme)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Состояние загрузки

  // Имитация задержки загрузки данных
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Установка состояния загрузки в false после задержки
    }, 2000); // Имитация 2 секундной задержки загрузки данных
  }, []);

  // Если данные загружаются, отображаем анимацию загрузки
  if (loading) {
    return (
      <div className={style.loader}>
        <div className={style.loaderAnimation}></div>
        <div className={style.loaderText}>Loading...</div>
      </div>
    );
  }

  // Если данные загружены, отображаем реальный контент
  return (
    <main className={`${theme === 'light' ? style.dark : style.light}`}>
      <MainBanner toggleThemeHandler={toggleThemeHandler} />
      <Categories toggleThemeHandler={toggleThemeHandler} />
      <DataUserForm toggleThemeHandler={toggleThemeHandler} />
      <Sales toggleThemeHandler={toggleThemeHandler} />
    </main>
  );
};
