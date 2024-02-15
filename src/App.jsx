import { Outlet } from "react-router-dom";
import { Footer } from "./layout/Footer/Footer";
import { Header } from "./layout/Header/Header";
import "/src/App.module.css"
import { SingleCategoryPage } from "./Components/SingleCategoryPage/SingleCategoryPage";

function App() {
  return (
      <div>
        <SingleCategoryPage/>
        {/* <Header />
        <Outlet />
        <Footer /> */}
      </div>
  );
}

export default App;