import { apiSlice } from "./apiSlice.js"
import { FEEDBACK_URL } from "../constants.js"

export const feedbackApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addFeedback: builder.mutation({
      query: (data) => ({
        url: FEEDBACK_URL,
        method: "POST",
        body: data,
      }),
    }),
    getFeedbacks: builder.query({
      query: ({ pageNumber }) => ({
        url: FEEDBACK_URL,
        params: { pageNumber },
      }),
      keepUnusedDataFor: 5,
    }),
    getFeedbackById: builder.query({
      query: (id) => `${FEEDBACK_URL}/${id}`,
    }),
    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `${FEEDBACK_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useAddFeedbackMutation,
  useGetFeedbacksQuery,
  useDeleteFeedbackMutation,
  useGetFeedbackByIdQuery,
} = feedbackApiSlice
