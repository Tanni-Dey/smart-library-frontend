/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setGenreAndYearSearch,
  setSearch,
} from "../redux/features/books/booksSlice";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { setUser } from "../redux/features/user/UserSlice";
import { useGetMyWishlistBooksQuery } from "../redux/api/ApiSlice";

interface ISearch {
  search: string;
}
const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = useGetMyWishlistBooksQuery(user.email, {
    refetchOnFocus: true,
    pollingInterval: 3000,
  });

  const { register, handleSubmit, reset } = useForm<ISearch>();

  const onSubmit: SubmitHandler<ISearch> = (data): void => {
    dispatch(setSearch(data.search));
    dispatch(setGenreAndYearSearch({ genreSelect: "", yearSelect: "" }));
    reset();
  };
  const handleSingout = async () => {
    await signOut(auth);
    dispatch(setUser(null));
  };
  return (
    <nav className="w-full h-20 top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto border-b border-teal-400">
          <div>
            <h4 className="text-teal-400 font-bold">
              <Link to="/">Smart Library</Link>
            </h4>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className=" border border-gray-200 focus:border-teal-400 px-3 py-1 rounded focus:outline-0"
                type="text"
                placeholder="Search"
                {...register("search")}
              />
            </form>
          </div>
          <div>
            <ul className="flex items-center">
              <li className="m-3">
                <Link to="/">Home</Link>
              </li>
              <li className="m-3">
                <Link to="/books">All Books</Link>
              </li>
              {user.email && (
                <li className="m-3">
                  <Link to="/add-new-book">Add New Book</Link>
                </li>
              )}
              {user.email && (
                <li className="m-3 relative inline-block">
                  <Link to="/my-wishlist">My Wishlist </Link>
                  <div className="absolute bg-gray-800 text-white h-6 items-center flex justify-center w-6 font-semibold text-sm rounded-full shadow-md transition-opacity duration-300 ease-in-out bottom-2/3 left-full transform -translate-x-1/2">
                    {data?.data.length}
                  </div>
                </li>
              )}
              <li className="m-3">
                {user.email ? (
                  <Link onClick={handleSingout} to="/login">
                    Logout
                  </Link>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
              <li className="m-3">
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
