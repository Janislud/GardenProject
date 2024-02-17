import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { AllCategories } from "./Components/AllCategories/AllCategories.jsx";
import { AllProductsPage } from "./Pages/AllProductsPage.jsx";
import { AllSalesPage } from "./Pages/AllSalesPage.jsx";
import { CartPage } from "./Pages/CartPage.jsx";
import { CategoriesPage } from "./Pages/CategoriesPage.jsx";
import { MainPage } from "./Pages/MainPage.jsx";
import { SingleProductPage } from "./Pages/SingleProductPage.jsx";
import { store } from "./store/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/all-categories",
        element: <AllCategories />,
      },
      {
        path: "/all-products",
        element: <AllProductsPage />,
      },
      {
        path: "/all-sales",
        element: <AllSalesPage />,
      },
      {
        path: "/sales/:id",
        element: <SingleProductPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
