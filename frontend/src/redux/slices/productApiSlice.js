import { PRODUCTS_URL, UPLOAD_URL } from "../constants"
import { apiSlice } from "./apiSlice.js"

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ pageNumber, keyword, category }) => ({
        url: PRODUCTS_URL,
        params: { pageNumber, keyword, category },
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
    getLandingPageProducts: builder.query({
      query: () => ({ url: `${PRODUCTS_URL}/landingPage`, method: "GET" }),
      keepUnusedDataFor: 5,
    }),
    getUpdateStatus: builder.mutation({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}/status`,
        method: "PUT",
      }),
      invalidatesTags: ["Products"],
    }),
    getAllProductsForAdmin: builder.query({
      query: ({ pageNumber, keyword, category }) => ({
        url: `${PRODUCTS_URL}/all`,
        params: { pageNumber, keyword, category },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
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
  useGetUpdateStatusMutation,
  useGetLandingPageProductsQuery,
  useGetAllProductsForAdminQuery,
} = productsApiSlice
