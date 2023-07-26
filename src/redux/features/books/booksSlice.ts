import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ISearchText {
  searchText: string;
}

const initialState: ISearchText = {
  searchText: "",
};

const booksSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    // setGenreAndYearSearch:(state,action:PayloadAction<string>)=>{

    // }
  },
});

export const { setSearch } = booksSlice.actions;

export default booksSlice.reducer;
