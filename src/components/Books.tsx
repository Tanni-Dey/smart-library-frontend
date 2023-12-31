/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetAllBooksQuery } from "../redux/api/ApiSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { IData, IGenreYearInput } from "../redux/types";
import SingleBook from "./SingleBook";
import { setGenreAndYearSearch } from "../redux/features/books/booksSlice";

const Books = () => {
  const dispatch = useAppDispatch();
  const { searchText, searchGenYear } = useAppSelector((state) => state.search);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = useGetAllBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  let books: IData[] | undefined = [];

  if (searchText !== "") {
    const titleSearchData = data?.data.filter(
      (singleBook) =>
        singleBook.title?.toLowerCase() === searchText.toLowerCase()
    );

    const genreSearchData = data?.data.filter(
      (singleBook) =>
        singleBook.genre?.toLowerCase() === searchText.toLowerCase()
    );
    const authorSearchData = data?.data.filter(
      (singleBook) =>
        singleBook.author?.toLowerCase() === searchText.toLowerCase()
    );
    const dateSearchData = data?.data.filter(
      (singleBook) =>
        singleBook.publicationDate?.toLowerCase() === searchText.toLowerCase()
    );

    if (titleSearchData?.length !== 0) {
      books = titleSearchData;
    } else if (genreSearchData?.length !== 0) {
      books = genreSearchData;
    } else if (authorSearchData?.length !== 0) {
      books = authorSearchData;
    } else if (dateSearchData?.length !== 0) {
      books = dateSearchData;
    }
  } else {
    books = data?.data;
  }

  const { genreSelect, yearSelect } = searchGenYear;

  if (genreSelect !== "" || yearSelect !== "") {
    const searchData = data?.data.filter(
      (singleBook) =>
        singleBook.genre?.toLowerCase() === genreSelect.toLowerCase() &&
        singleBook.publicationDate?.includes(yearSelect)
    );

    books = searchData;
  }

  let allBooks: IData[] = [];
  if (books !== undefined) {
    allBooks = [...books].reverse();
  }

  const { register, handleSubmit } = useForm<IGenreYearInput>();

  const onSubmit: SubmitHandler<IGenreYearInput> = (data) => {
    dispatch(setGenreAndYearSearch(data));
  };

  console.log(searchGenYear);
  console.log(searchText);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <div className="fixed">
          <form onSubmit={handleSubmit(onSubmit)}>
            <select
              {...register("genreSelect")}
              name="genreSelect"
              id="genreSelect"
            >
              <option value="novel">Novel</option>
              <option value="narrative">Narrative</option>
              <option value="drama">Drama</option>
              <option value="fiction">Fiction</option>
            </select>
            <select
              {...register("yearSelect")}
              name="yearSelect"
              id="yearSelect"
            >
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
            <input type="submit" value="Search" />
          </form>
        </div>
      </div>
      <div className="col-span-10">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {books?.length !== 0 ? (
            allBooks?.map((book) => <SingleBook key={book._id} book={book} />)
          ) : (
            <h3 className="text-red-600 font-bold text-2xl text-center">
              Book doesn't exist
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
