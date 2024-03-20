import { apiSlice } from "./apiSlice.js"
import { WORKER_URL } from "../constants.js"

export const workerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWorkers: builder.query({
      query: () => ({
        url: WORKER_URL,
      }),
      providesTags: ["Worker"],
    }),
    getWorkerById: builder.query({
      query: (id) => ({
        url: `${WORKER_URL}/${id}`,
      }),
      providesTags: ["Worker"],
    }),
    addWorker: builder.mutation({
      query: (data) => ({
        url: WORKER_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Worker"],
    }),
    updateWorker: builder.mutation({
      query: (data) => ({
        url: `${WORKER_URL}/${data.workerId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Worker"],
    }),
    deleteWorker: builder.mutation({
      query: (id) => ({
        url: `${WORKER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Worker"],
    }),
    addNegativeBalance: builder.mutation({
      query: (data) => ({
        url: `${WORKER_URL}/${data.id}/addnegativebalance`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Worker"],
    }),
    subtractNegativeBalance: builder.mutation({
      query: (data) => ({
        url: `${WORKER_URL}/${data.id}/subtractnegativebalance`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Worker"],
    }),
  }),
})
export const {
  useGetWorkersQuery,
  useGetWorkerByIdQuery,
  useAddWorkerMutation,
  useUpdateWorkerMutation,
  useDeleteWorkerMutation,
  useAddNegativeBalanceMutation,
  useSubtractNegativeBalanceMutation,
} = workerApiSlice
