import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Footer } from "./layout/Footer/Footer";
import { Header } from "./layout/Header/Header";
import style from "./App.module.css";

function App() {

  const theme = useSelector((state) => state.theme.theme)

  return (
    <div className={theme === 'light' ? style.dark : style.light}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
