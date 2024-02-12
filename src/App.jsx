import { Outlet } from "react-router-dom";
import { Footer } from "./layout/Footer/Footer";
import { Header } from "./layout/Header/Header";
import { MainPage } from "./Pages/MainPage";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
