import {
  useAddToReadCompletedMutation,
  useGetMyWishlistBooksQuery,
} from "../redux/api/ApiSlice";
import { useAppSelector } from "../redux/hooks";
import { useState } from "react";
import SingleWishlistBook from "../components/SingleWishlistBook";

const MyWishlist = () => {
  const [myBook, setMyBook] = useState({});
  const { user } = useAppSelector((state) => state.user);
  const { data } = useGetMyWishlistBooksQuery(user.email, {
    refetchOnFocus: true,
    pollingInterval: 3000,
  });

  // console.log(myBook);

  return (
    <div className="grid gap-5 grid-cols-3">
      {data.data.map((book) => (
        <SingleWishlistBook key={book._id} book={book} />
      ))}
    </div>
  );
};
export default MyWishlist;
