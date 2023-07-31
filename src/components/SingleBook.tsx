import { IData } from "../redux/types";
import bookImg from "../assets/images/book1.avif";
import { Link } from "react-router-dom";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

interface IProps {
  book: IData;
}
const SingleBook = ({ book }: IProps) => {
  const { _id, title, author, genre, publicationDate } = book;

  return (
    <div className="mb-10 m-5 rounded-lg text-left p-5 border hover:border-teal-400">
      <Link to={`/book-details/${_id}`}>
        <img className="mx-auto mb-5 rounded-lg" src={bookImg} alt="img" />
        <h4 className="text-xl font-bold text-teal-400 capitalize">{title}</h4>
        <h6 className="text-md text-gray-500 capitalize">Author : {author}</h6>
        <h6 className="text-md text-gray-500 capitalize">Genre : {genre}</h6>
        <h6 className="text-md text-gray-500 capitalize">
          Date : {publicationDate}
        </h6>
      </Link>
      <div className="flex items-center justify-between mt-5">
        <button className="text-center">
          <FcLike />
          <FcLikePlaceholder />
        </button>
        <button className="bg-teal-400 rounded p-2 text-white font-semibold text-sm hover:bg-teal-300 focus:outline-0 focus:bg-teal-500">
          Read Complete
        </button>
      </div>
    </div>
  );
};

export default SingleBook;
