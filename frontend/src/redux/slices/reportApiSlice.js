import { apiSlice } from "./apiSlice.js"
import { REPORT_URL } from "../constants.js"

export const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    daily: builder.query({
      query: (data) => ({
        url: `${REPORT_URL}/${data.type}`,
      }),
    }),
  }),
})

export const { useDailyQuery } = reportApiSlice
