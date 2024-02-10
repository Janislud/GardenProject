import { Outlet } from "react-router-dom";
import { Header } from "./layout/Header/Header";
import { Footer } from "./layout/Footer/Footer";


function App() {
  return (
    <>
      <div>
        <Header />
        <Outlet />
        <Footer/>
      </div>
    </>
  );
}

export default App;
