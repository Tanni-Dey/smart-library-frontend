import bookImg from "../assets/images/book1.avif";
import { IData } from "../redux/types";
import { useAppSelector } from "../redux/hooks";
import { useAddToReadCompletedMutation } from "../redux/api/ApiSlice";
interface IProps {
  book: IData;
}
const SingleWishlistBook = ({ book }: IProps) => {
  const { user } = useAppSelector((state) => state.user);
  const [addToReadCompleted] = useAddToReadCompletedMutation();

  const handleAddToReadCompleted = async () => {
    await addToReadCompleted({
      id: book._id,
      data: { readCompleted: user.email },
    });
  };

  const isReadCompleted = book?.readCompleted?.find(
    (singleUser: string | null) => user?.email === singleUser
  );

  return (
    <div className="bg-white p-4 rounded shadow-md flex">
      <div className="w-1/4">
        <img src={bookImg} alt="Card Image" className="w-full h-auto rounded" />
      </div>
      <div className="w-3/4 pl-5">
        <h2 className="text-xl text-teal-400 font-semibold mb-2 capitalize">
          {book.title}
        </h2>
        <p className="text-gray-600 text-semibold capitalize">
          Written by {book.author}. This book is {book.genre}
        </p>

        {isReadCompleted === user.email ? (
          <button
            disabled
            className="bg-gray-300 rounded p-2 text-white font-semibold text-sm  focus:outline-0 focus:bg-gray-300 mt-2"
          >
            Read Complete
          </button>
        ) : (
          <button
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleAddToReadCompleted}
            className="bg-teal-400 rounded p-2 text-white font-semibold text-sm hover:bg-teal-300 focus:outline-0 focus:bg-teal-500 mt-2"
          >
            Read Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleWishlistBook;
