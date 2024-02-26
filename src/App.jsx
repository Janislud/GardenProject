import { Outlet } from "react-router-dom";
import { Footer } from "./layout/Footer/Footer";
import { Header } from "./layout/Header/Header";
import style from "/src/App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "./slices/themaSlice";

function App() {

  const theme = useSelector(state => state.theme.theme);
  const color = useSelector(state => state.theme.color)
  const dispatch = useDispatch();

  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className={theme === 'light' ? style.dark : style.light}>
      <Header toggleThemeHandler={toggleThemeHandler} />
      <Outlet toggleThemeHandler={toggleThemeHandler} />
      <Footer toggleThemeHandler={toggleThemeHandler} />
    </div>
  );
}

export default App;
