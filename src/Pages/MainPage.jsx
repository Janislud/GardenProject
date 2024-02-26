import { useSelector } from "react-redux";
import style from "./MainPage.module.css";
import { Categories } from "../Components/Categories/Categories";
import { DataUserForm } from "../Components/DataUserForm/DataUserForm";
import { MainBanner } from "../Components/MainBanner/MainBanner";
import { Sales } from "../Components/Sales/Sales";

export const MainPage = () => {
  const theme = useSelector((state => state.theme.theme))
  
  return (
    <main className={`${theme === 'light' ? style.dark : style.light}`}>
      <MainBanner />
      <Categories />
      <DataUserForm />
      <Sales />
    </main>
  );
};
