import { useGetMyWishlistBooksQuery } from "../redux/api/ApiSlice";
import { useAppSelector } from "../redux/hooks";
import bookImg from "../assets/images/book1.avif";

const MyWishlist = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data } = useGetMyWishlistBooksQuery(user.email, {
    refetchOnFocus: true,
    pollingInterval: 3000,
  });

  console.log(data);

  return (
    <div className="grid gap-5 grid-cols-3">
      {data.data.map((book) => (
        <div key={book._id} className="bg-white p-4 rounded shadow-md flex">
          <div className="w-1/4">
            <img
              src={bookImg}
              alt="Card Image"
              className="w-full h-auto rounded"
            />
          </div>
          <div className="w-3/4 pl-5">
            <h2 className="text-xl text-teal-400 font-semibold mb-2 capitalize">
              {book.title}
            </h2>
            <p className="text-gray-600 text-semibold capitalize">
              Written by {book.author}. This book is {book.genre}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyWishlist;
