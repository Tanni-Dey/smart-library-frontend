/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useEditBookMutation,
  useGetSingleBookQuery,
} from "../redux/api/ApiSlice";
import Swal from "sweetalert2";

interface IBookInput {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  userEmail?: string | null;
}

const EditBook = () => {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = useGetSingleBookQuery(id as string, {
    refetchOnFocus: true,
    pollingInterval: 3000,
  });
  const [editBook] = useEditBookMutation();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const book = data?.data;

  const { register, handleSubmit, reset } = useForm<IBookInput>();

  const onSubmit: SubmitHandler<IBookInput> = async (editedBook) => {
    const editData = await editBook({ id: id, data: editedBook });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if ("data" in editData) {
      if (editData?.data?.data?.acknowledged) {
        void Swal.fire({
          title: "Book Edited",
          icon: "success",
        });
      } else {
        void Swal.fire({
          title: "Something went Wrong. Book Not Edited",
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
          Edit {book?.title} Book
        </h4>
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="w-full border border-teal-400 p-3 rounded mb-3 focus:outline-0"
            defaultValue={book?.title}
            placeholder="Enter Book title"
            type="text"
            {...register("title")}
          />
          <input
            className="w-full border border-teal-400 p-3 rounded mb-3 focus:outline-0"
            placeholder="Enter Book Author"
            defaultValue={book?.author}
            type="text"
            {...register("author", { required: true })}
          />
          <input
            className="w-full border border-teal-400 p-3 rounded mb-3 focus:outline-0"
            placeholder="Enter Book Genre"
            defaultValue={book?.genre}
            type="text"
            {...register("genre", { required: true })}
          />
          <input
            className="w-full border border-teal-400 p-3 rounded mb-3 focus:outline-0"
            defaultValue={book?.publicationDate}
            placeholder="Enter Date"
            type="text"
            {...register("publicationDate", { required: true })}
          />

          <input
            className="bg-teal-400 rounded p-3 text-white w-full font-bold hover:bg-teal-300 focus:outline-0 focus:bg-teal-500"
            type="submit"
            value="Edit Book"
          />
        </form>
      </div>
    </div>
  );
};

export default EditBook;
