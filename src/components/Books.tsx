import { useGetAllBooksQuery } from "../redux/api/ApiSlice";
import { useAppSelector } from "../redux/hooks";
import { IData } from "../redux/types";
import SingleBook from "./SingleBook";

const Books = () => {
  const { searchText } = useAppSelector((state) => state.search);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = useGetAllBooksQuery(undefined);
  console.log(searchText);

  let books: IData[] | undefined = [];
  if (searchText !== "") {
    const titleSearchData = data?.data.filter(
      (singleBook) =>
        singleBook.title.toLowerCase() === searchText.toLowerCase()
    );
    const genreSearchData = data?.data.filter(
      (singleBook) =>
        singleBook.genre.toLowerCase() === searchText.toLowerCase()
    );
    const authorSearchData = data?.data.filter(
      (singleBook) =>
        singleBook.author.toLowerCase() === searchText.toLowerCase()
    );
    const dateSearchData = data?.data.filter(
      (singleBook) =>
        singleBook.publicationDate.toLowerCase() === searchText.toLowerCase()
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
  console.log(books?.length);
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
      {books?.length !== 0 ? (
        books?.map((book) => <SingleBook key={book._id} book={book} />)
      ) : (
        <h3 className="text-red-600 font-bold text-2xl text-center">
          Book doesn't exist
        </h3>
      )}
    </div>
  );
};

export default Books;
