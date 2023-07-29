import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/api/ApiSlice";
import bookImg from "../assets/images/book1.avif";

const SingleBookDetails = () => {
  const { id } = useParams();
  const { data } = useGetSingleBookQuery(id);
  const book = data?.data;
  console.log(data);

  return (
    <div className="grid grid-cols-2 items-center">
      <div>
        <img src={bookImg} alt="img" />
      </div>
      <div>
        <h3 className="text-3xl text-teal-400 font-bold capitalize">
          {book?.title}
        </h3>
        <h4 className="text-xl text-gray-400 capitalize">
          Written by {book?.author}
        </h4>
        <h4 className="text-xl text-gray-400 capitalize">
          Genre : {book?.genre}
        </h4>
        <h4 className="text-xl text-gray-400 capitalize">
          Publication date : {book?.publicationDate}
        </h4>
      </div>
    </div>
  );
};

export default SingleBookDetails;
