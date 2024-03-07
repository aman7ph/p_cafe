import { apiSlice } from "./apiSlice.js"
import { MATERIAL_URL } from "../constants.js"

export const materialApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMaterial: builder.mutation({
      query: (data) => ({
        url: MATERIAL_URL,
        method: "POST",
        body: data,
      }),
    }),

    getMaterials: builder.query({
      query: ({ pageNumber }) => ({
        url: MATERIAL_URL,
        params: { pageNumber },
      }),
      keepUnusedDataFor: 5,
    }),
    getMaterialById: builder.query({
      query: (id) => ({
        url: `${MATERIAL_URL}/${id}`,
      }),
    }),
    deleteMaterialById: builder.mutation({
      query: (id) => ({
        url: `${MATERIAL_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    addMaterials: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${MATERIAL_URL}/add/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    substractMaterials: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${MATERIAL_URL}/substract/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
})

export const {
  useGetMaterialsQuery,
  useGetMaterialByIdQuery,
  useDeleteMaterialByIdMutation,
  useCreateMaterialMutation,
  useAddMaterialsMutation,
  useSubstractMaterialsMutation,
} = materialApiSlice
