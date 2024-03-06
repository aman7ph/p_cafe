import { apiSlice } from "./apiSlice.js"
import { PROMOTION_URL } from "../constants.js"
import { UPLOAD_URL } from "../constants.js"

export const promotionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPromotions: builder.query({
      query: () => ({
        url: PROMOTION_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getPromotionById: builder.query({
      query: (id) => ({
        url: `${PROMOTION_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createPromotion: builder.mutation({
      query: (data) => ({
        url: PROMOTION_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Promotion"],
    }),
    updatePromotion: builder.mutation({
      query: (data) => ({
        url: `${PROMOTION_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Promotion"],
    }),
    deletePromotion: builder.mutation({
      query: (id) => ({
        url: `${PROMOTION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Promotion"],
    }),
    uploadPromotionImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
})
export const {
  useGetPromotionsQuery,
  useCreatePromotionMutation,
  useUpdatePromotionMutation,
  useDeletePromotionMutation,
  useUploadPromotionImageMutation,
  useGetPromotionByIdQuery,
  useGetAllPromotionsQuery,
} = promotionApiSlice
