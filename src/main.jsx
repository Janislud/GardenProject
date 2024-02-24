import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { SingleCategoryPage } from "./Components/SingleCategoryPage/SingleCategoryPage.jsx";
import { AllSalesPage } from "./Pages/AllSalesPage.jsx";
import { CartPage } from "./Pages/CartPage.jsx";
import { CategoriesPage } from "./Pages/CategoriesPage.jsx";
import { ErrorPage } from "./Pages/ErrorPage.jsx";
import { MainPage } from "./Pages/MainPage.jsx";
import { ProductsPage } from "./Pages/ProductsPage.jsx";
import { SingleProductPage } from "./Pages/SingleProductPage.jsx";
import { SingleSalePage } from "./Pages/SingleSalePage.jsx";
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
        path: "/categories/:id",
        element: <SingleCategoryPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/products/:id",
        element: <SingleProductPage />,
      },
      {
        path: "/sales",
        element: <AllSalesPage />,
      },
      {
        path: "/sales/:id",
        element: <SingleSalePage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/like",
        element: <CartPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
