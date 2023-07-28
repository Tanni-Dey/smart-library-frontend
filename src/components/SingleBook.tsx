import { IData } from "../redux/types";
import bookImg from "../assets/images/book1.avif";
import { Link } from "react-router-dom";

interface IProps {
  book: IData;
}
const SingleBook = ({ book }: IProps) => {
  const { _id, title, author, genre, publicationDate } = book;

  return (
    <Link to={`/book-details/${_id}`}>
      <div className="mb-10 m-5 rounded-lg text-center p-5 border hover:border-teal-400">
        <img className="mx-auto mb-5 rounded-lg" src={bookImg} alt="img" />
        <h4 className="text-2xl font-bold text-teal-400 capitalize">{title}</h4>
        <h6 className="text-xl text-gray-500 capitalize">Author : {author}</h6>
        <h6 className="text-xl text-gray-500 capitalize">Genre : {genre}</h6>
        <h6 className="text-xl text-gray-500 capitalize">
          Date : {publicationDate}
        </h6>
      </div>
    </Link>
  );
};

export default SingleBook;
