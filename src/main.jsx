import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { AllCategories } from "./Components/AllCategories/AllCategories.jsx";
import { SingleCategoryPage } from "./Components/SingleCategoryPage/SingleCategoryPage.jsx";
import { AllSalesPage } from "./Pages/AllSalesPage.jsx";
import { CartPage } from "./Pages/CartPage.jsx";
import { ErrorPage } from "./Pages/ErrorPage.jsx";
import { LikedProductsPage } from "./Pages/LikedProductsPage.jsx";
import { MainPage } from "./Pages/MainPage.jsx";
import { ProductsPage } from "./Pages/ProductsPage.jsx";
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
        element: <AllCategories />,
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
        element: <SingleProductPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/favorites",
        element: <LikedProductsPage />,
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
