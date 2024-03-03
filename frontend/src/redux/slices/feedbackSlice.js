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
      query: () => ({
        url: FEEDBACK_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const { useAddFeedbackMutation, useGetFeedbacksQuery } = feedbackApiSlice
