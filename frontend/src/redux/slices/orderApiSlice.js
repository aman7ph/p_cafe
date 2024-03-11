import { apiSlice } from "./apiSlice.js"
import { ORDER_URL } from "../constants.js"

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

    getAllOrders: builder.query({
      query: ({ pageNumber }) => ({
        url: ORDER_URL,
        params: { pageNumber },
      }),
      keepUnusedDataFor: 5,
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

  usePayOrderMutation,

  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} = orderApiSlice
