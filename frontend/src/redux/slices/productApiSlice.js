import { PRODUCTS_URL, UPLOAD_URL } from "../constants"
import { apiSlice } from "./apiSlice.js"

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ pageNumber, keyword }) => ({
        url: PRODUCTS_URL,
        params: { pageNumber, keyword },
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ["Products"],
    }),
    getProductDetails: builder.query({
      query: (id) => ({ url: `${PRODUCTS_URL}/${id}`, method: "GET" }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: `${PRODUCTS_URL}/create`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `${PRODUCTS_URL}/${product.id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    creareReviewProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.id}/review`,
        method: "POST",
        body: data,
      }),
    }),
    getTopProducts: builder.query({
      query: () => ({ url: `${PRODUCTS_URL}/top`, method: "GET" }),
      keepUnusedDataFor: 5,
    }),
    getLandingPageProducts: builder.query({
      query: () => ({ url: `${PRODUCTS_URL}/landingPage`, method: "GET" }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreareReviewProductMutation,
  useGetTopProductsQuery,
  useGetLandingPageProductsQuery,
} = productsApiSlice
