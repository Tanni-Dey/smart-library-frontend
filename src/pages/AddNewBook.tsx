/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { usePostAddBookMutation } from "../redux/api/ApiSlice";
import { useAppSelector } from "../redux/hooks";
interface IBookInput {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  userEmail?: string | null;
}

const AddNewBook = () => {
  const date = new Date();
  const { user } = useAppSelector((state) => state.user);
  const [postAddBook] = usePostAddBookMutation();

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString(); // Extract last two digits of the year

    return `${day}/${month}/${year}`;
  };
  const formattedDate = formatDate(date);
  const { register, handleSubmit, reset } = useForm<IBookInput>();

  const onSubmit: SubmitHandler<IBookInput> = async (newBook) => {
    newBook.userEmail = user.email;

    const postData = await postAddBook(newBook);

    if ("data" in postData) {
      if (postData?.data?.data?.insertedId !== "") {
        void Swal.fire({
          title: "New Book Added",
          icon: "success",
        });
      } else {
        void Swal.fire({
          title: "Book Not Added",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
      reset();
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="p-10 rounded shadow-2xl md:w-1/3">
        <h4 className="text-teal-400 font-bold mb-5 text-3xl text-center uppercase">
          Add New Book
        </h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="w-full border border-teal-400 p-3 rounded mb-3 focus:outline-0"
            placeholder="Enter Book title"
            type="text"
            {...register("title")}
          />
          <input
            className="w-full border border-teal-400 p-3 rounded mb-3 focus:outline-0"
            placeholder="Enter Book Author"
            type="text"
            {...register("author", { required: true })}
          />
          <input
            className="w-full border border-teal-400 p-3 rounded mb-3 focus:outline-0"
            placeholder="Enter Book Genre"
            type="text"
            {...register("genre", { required: true })}
          />
          <input
            className="w-full border border-teal-400 p-3 rounded mb-3 focus:outline-0"
            defaultValue={formattedDate}
            placeholder="Enter Date"
            type="text"
            {...register("publicationDate", { required: true })}
          />

          <input
            className="bg-teal-400 rounded p-3 text-white w-full font-bold hover:bg-teal-300 focus:outline-0 focus:bg-teal-500"
            type="submit"
            value="Add Book"
          />
        </form>
      </div>
    </div>
  );
};

export default AddNewBook;
