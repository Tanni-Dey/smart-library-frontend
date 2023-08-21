import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IGenreYearInput } from "../../types";

interface ISearchText {
  searchText: string;
  searchGenYear: IGenreYearInput;
}

const initialState: ISearchText = {
  searchText: "",
  searchGenYear: { genreSelect: "", yearSelect: "" },
};

const booksSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setGenreAndYearSearch: (state, action: PayloadAction<IGenreYearInput>) => {
      state.searchGenYear = action.payload;
    },
  },
});

export const { setSearch, setGenreAndYearSearch } = booksSlice.actions;

export default booksSlice.reducer;
