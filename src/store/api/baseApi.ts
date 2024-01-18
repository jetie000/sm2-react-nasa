import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { variables } from "@/variables";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
      baseUrl: variables.API_URL
    }),
    tagTypes: ["Pic", "Pics"],
    endpoints: () => ({}),
  });