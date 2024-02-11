import { Outlet } from "react-router-dom";
import { Footer } from "./layout/Footer/Footer";
import { Header } from "./layout/Header/Header";
import { MainPage } from "./Pages/MainPage";

function App() {
  return (
    <>
      <Header />
      <MainPage />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
