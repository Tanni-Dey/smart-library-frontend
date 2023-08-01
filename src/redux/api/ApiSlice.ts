import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IData, IResponse } from "../types";
export const ApiSlice = createApi({
  reducerPath: "books",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getAllBooks: builder.query<IResponse, undefined>({
      query: () => "/books",
      providesTags: [],
    }),
    getSingleBook: builder.query({
      query: (id: string) => `/book-details/${id}`,
    }),
    postAddBook: builder.mutation({
      query: (data: IData) => ({
        url: "/add-book",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),
    addReview: builder.mutation({
      query: ({ id, data }: { id: string; data: { reviews: string } }) => ({
        url: `/add-review/${id}`,
        method: "PUT",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        body: data,
      }),
      // invalidatesTags: ["reviews"],
    }),
    getReviews: builder.query({
      query: (id: string) => `/reviews/${id}`,
      // providesTags: ["reviews"],
    }),
    editBook: builder.mutation({
      query: ({ id, data }: { id: string; data: IData }) => ({
        url: `/edit-book/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/book/${id}`,
        method: "DELETE",
      }),
    }),
    addToWishlist: builder.mutation({
      query: ({
        id,
        data,
      }: {
        id: string;
        data: { wishlist: string | null };
      }) => ({
        url: `/add-to-wishlist/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  usePostAddBookMutation,
  useAddReviewMutation,
  useGetReviewsQuery,
  useEditBookMutation,
  useDeleteBookMutation,
  useAddToWishlistMutation,
} = ApiSlice;
