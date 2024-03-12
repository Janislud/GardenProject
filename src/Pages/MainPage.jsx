import { useSelector } from "react-redux";
import { Categories } from "../Components/Categories/Categories";
import { DataUserForm } from "../Components/DataUserForm/DataUserForm";
import { MainBanner } from "../Components/MainBanner/MainBanner";
import { Sales } from "../Components/Sales/Sales";
import style from "./MainPage.module.css";

export const MainPage = ({ toggleThemeHandler }) => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <main className={`${theme === "light" ? style.dark : style.light}`}>
      <MainBanner toggleThemeHandler={toggleThemeHandler} />
      <Categories toggleThemeHandler={toggleThemeHandler} />
      <DataUserForm toggleThemeHandler={toggleThemeHandler} />
      <Sales toggleThemeHandler={toggleThemeHandler} />
    </main>
  );
};
