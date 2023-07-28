import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponse } from "../types";
export const ApiSlice = createApi({
  reducerPath: "books",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getAllBooks: builder.query<IResponse[], undefined>({
      query: () => "/books",
      providesTags: [],
    }),
    getSingleBook: builder.query({
      query: (id) => `/book-details/${id}`,
    }),
    postAddBook: builder.mutation<IResponse, undefined>({
      query: (data) => ({
        url: "/add-book",
        method: "POST",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        body: data,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  usePostAddBookMutation,
} = ApiSlice;
