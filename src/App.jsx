import { Route, Routes } from "react-router-dom";
import { Header } from "./layout/Header/Header";
import { NotFound } from "./Pages/NotFound";


function App() {
  return (
    <>
      <div>
        <Header />
        {/* <Routes>
          <Route path='/main' element={MainPage} />
            <Route path='/categories' element={Categories} />
            <Route path='/all-products' element={AllProducts} />
            <Route path='/all-sales' element={AllSales} />
        </Routes> */}
      </div>
    </>
  );
}

export default App;
