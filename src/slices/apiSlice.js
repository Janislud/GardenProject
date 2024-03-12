import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dateApi = createApi({
  reducerPath: "dateApi", // Пути к редусеру
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3333" }), //база
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/categories/all", //метод для получения url.
      method: "GET",
    }),
    // создал сразу 2 запрос по категорий ид.
    getCategoriesById: builder.query({
      query: (categoryId) => `categories/${categoryId}`,
      method: "GET",
    }),

    getProducts: builder.query({
      query: () => "products/all",
      method: "GET",
    }),

    getProductById: builder.query({
      query: (productId) => `products/${productId}`,
      method: "GET",
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoriesByIdQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
} = dateApi;
