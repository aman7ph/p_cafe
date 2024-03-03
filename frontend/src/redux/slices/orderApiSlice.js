import { apiSlice } from "./apiSlice.js"
import { ORDER_URL } from "../constants.js"
import { PAYPAL_URL } from "../constants.js"
import { CHAPA_URL } from "../constants.js"

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addOrderItems: builder.mutation({
      query: (order) => ({
        url: ORDER_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetailById: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ id, details }) => ({
        url: `${ORDER_URL}/${id}/pay`,
        method: "PUT",
        body: { ...details },
      }),
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    // getChapaPayClientId: builder.query({
    //   query: () => ({
    //     url: CHAPA_URL,
    //   }),
    //   keepUnusedDataFor: 5,
    //}),
    payChapaOrder: builder.mutation({
      query: (order) => ({
        url: CHAPA_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    verfyChapa: builder.query({
      query: (id) => ({
        url: `${CHAPA_URL}/${id}`,
        method: "GET",
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/myorders`,
      }),
      keepUnusedDataFor: 5,
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: ORDER_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (id) => ({
        url: `${ORDER_URL}/${id}/deliver`,
        method: "PUT",
      }),
    }),
    updateOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDER_URL}/${order.id}/update`,
        method: "PUT",
        body: { ...order },
      }),
    }),
  }),
})

export const {
  useAddOrderItemsMutation,
  useGetOrderDetailByIdQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
  useGetChapaPayClientIdQuery,
  usePayChapaOrderMutation,
  useVerfyChapaQuery,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useDeliverOrderMutation,
  useUpdateOrderMutation,
} = orderApiSlice
