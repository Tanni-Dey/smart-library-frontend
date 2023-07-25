import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponse } from "../types";
export const ApiSlice = createApi({
  reducerPath: "books",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getAllBooks: builder.query<IResponse, undefined>({
      query: () => "/books",
    }),
  }),
});

export const { useGetAllBooksQuery } = ApiSlice;
