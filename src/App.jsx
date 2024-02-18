import { Outlet } from "react-router-dom";
import { Footer } from "./layout/Footer/Footer";
import { Header } from "./layout/Header/Header";
import "/src/App.module.css";

function App() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
