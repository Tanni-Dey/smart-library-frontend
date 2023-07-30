import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useEditBookMutation,
  useGetSingleBookQuery,
} from "../redux/api/ApiSlice";

interface IBookInput {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  userEmail?: string | null;
}

const EditBook = () => {
  const { id } = useParams();
  const { data } = useGetSingleBookQuery(id);
  const [editBook] = useEditBookMutation();
  const book = data?.data;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBookInput>();

  const onSubmit: SubmitHandler<IBookInput> = async (editedBook) => {
    console.log(editedBook);
    const editData = await editBook({ id: id, data: editedBook });
    console.log(editedBook);
    reset();
  };

  return (
    <div className="flex justify-center items-center">
      <div className="p-10 rounded shadow-2xl md:w-1/3">
        <h4 className="text-teal-400 font-bold mb-5 text-3xl text-center uppercase">
          Edit {book?.title} Book
        </h4>
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

          {/* errors will return when field validation fails  */}

          {/* {errors.email && <span>This field is required</span>}
  {isError && error} */}

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
