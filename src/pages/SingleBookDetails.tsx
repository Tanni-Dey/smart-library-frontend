import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useAddReviewMutation,
  useDeleteBookMutation,
  useGetReviewsQuery,
  useGetSingleBookQuery,
} from "../redux/api/ApiSlice";

import bookImg from "../assets/images/book1.avif";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../redux/hooks";
import Swal from "sweetalert2";

interface IReview {
  review: string;
}

const SingleBookDetails = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.user);
  const { data } = useGetSingleBookQuery(id);
  const [deleteBook] = useDeleteBookMutation();
  const { data: bookReview } = useGetReviewsQuery(id, {
    refetchOnFocus: true,
    pollingInterval: 3000,
  });
  const [addReview] = useAddReviewMutation();
  const navigate = useNavigate();
  const book = data?.data;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IReview>();

  const onSubmit: SubmitHandler<IReview> = async (newReview) => {
    await addReview({ id: id, data: { reviews: newReview.review } });
    reset();
  };

  const handleDelete = () => {
    void Swal.fire({
      title: "Do you want Delete the Book?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteData = await deleteBook(id);
        if (deleteData?.data?.data?.acknowledged) {
          void Swal.fire({
            title: "Book Deleted",
            icon: "success",
          });
          navigate("/");
        } else {
          void Swal.fire({
            title: "Something went Wrong. Book Not Deleted",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className="grid grid-cols-2">
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
        {user.email === book?.userEmail && (
          <div className="mt-5 text-right">
            <Link
              to={`/edit-book/${book._id}`}
              className="bg-teal-400 rounded p-3 text-white font-bold hover:bg-teal-300 focus:outline-0 focus:bg-teal-500"
            >
              Edit the book
            </Link>
            <button
              onClick={handleDelete}
              className="ml-5 bg-red-400 rounded p-3 text-white font-bold hover:bg-red-300 focus:outline-0 focus:bg-red-500"
            >
              Delete the book
            </button>
          </div>
        )}
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
          {bookReview?.data?.map((singleReview: string, index: number) => (
            <div key={index} className="flex mb-5">
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
