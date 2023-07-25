import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/UserSlice";
import searchReducer from "./features/books/booksSlice";
import { ApiSlice } from "./api/ApiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    [ApiSlice.reducerPath]: ApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
