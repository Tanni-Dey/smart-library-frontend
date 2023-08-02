/* eslint-disable @typescript-eslint/no-misused-promises */
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSearch } from "../redux/features/books/booksSlice";
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
  const { data } = useGetMyWishlistBooksQuery(user.email, {
    refetchOnFocus: true,
    pollingInterval: 3000,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISearch>();

  const onSubmit: SubmitHandler<ISearch> = (data): void => {
    dispatch(setSearch(data.search));
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
                  <div className="absolute bg-gray-800 text-white p-1 text-sm rounded-full shadow-md transition-opacity duration-300 ease-in-out bottom-3/4 left-full transform -translate-x-1/2">
                    {data.data.length}
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
              <li>
                {/* <Button variant="ghost">
              <HiOutlineSearch size="25" />
            </Button> */}
              </li>
              {/* <li>
            <Cart />
          </li>
          <li className="ml-5">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Team
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Subscription
                </DropdownMenuItem>
                {!user.email ? (
                  <>
                    <Link to="/login">
                      <DropdownMenuItem className="">
                        login
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/signup">
                      <DropdownMenuItem className="">
                        signup
                      </DropdownMenuItem>
                    </Link>
                  </>
                ) : (
                  <DropdownMenuItem onClick={handleLogout} className="">
                    Logout
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </li> */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
