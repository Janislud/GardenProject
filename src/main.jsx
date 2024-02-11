import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { AllProductsPage } from "./Pages/AllProductsPage.jsx";
import { AllSalesPage } from "./Pages/AllSalesPage.jsx";
import { CategoriesPage } from "./Pages/CategoriesPage.jsx";
import { CheckOut } from "./Pages/CheckOut.jsx";
import { MainPage } from "./Pages/MainPage.jsx";
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
        path: "/all-products",
        element: <AllSalesPage />,
      },
      {
        path: "/all-sales",
        element: <AllProductsPage />,
      },
      {
        path: "/check",
        element: <CheckOut />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
