import React from "react";
import { useParams } from "react-router-dom";
import {
  useAddReviewMutation,
  useGetReviewsQuery,
  useGetSingleBookQuery,
} from "../redux/api/ApiSlice";
import { IResponse, IData } from "../redux/types";
import bookImg from "../assets/images/book1.avif";
import { SubmitHandler, useForm } from "react-hook-form";

interface IReview {
  review: string;
}

const SingleBookDetails = () => {
  const { id } = useParams();
  const { data } = useGetSingleBookQuery(id);
  const { data: bookReview } = useGetReviewsQuery(id, {
    refetchOnFocus: true,
    pollingInterval: 3000,
  });
  const [addReview] = useAddReviewMutation();
  const book = data?.data;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IReview>();

  const onSubmit: SubmitHandler<IReview> = async (newReview, e) => {
    await addReview({ id: id, data: { reviews: newReview.review } });
    e?.target.reset();
  };

  return (
    <div className="grid grid-cols-2 items-center">
      <div>
        <img className="rounded-xl" src={bookImg} alt="img" />
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
        <div>
          <form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
            <input
              className=" border border-gray-200 focus:border-teal-400 px-3 py-1 rounded focus:outline-0 w-full"
              type="text"
              placeholder="Give your Feedback"
              {...register("review")}
            />
          </form>
          <h4 className="border-b border-teal-400 mt-12 mb-8 text-teal-400 text-2xl font-bold text-center">
            Review of The Book
          </h4>
          {bookReview?.data?.map((singleReview) => (
            <div className="flex mb-5">
              <div className="w-[40px] h-[40px] bg-gray-400  rounded-full flex items-center justify-center mr-3">
                <h3 className="text-white text-xl">H</h3>
              </div>
              <p>{singleReview}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleBookDetails;
