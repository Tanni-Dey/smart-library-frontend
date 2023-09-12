/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useGetMyWishlistBooksQuery } from "../redux/api/ApiSlice";
import { useAppSelector } from "../redux/hooks";
import SingleWishlistBook from "../components/SingleWishlistBook";
import { IData } from "../redux/types";

const MyWishlist = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data } = useGetMyWishlistBooksQuery(user.email, {
    refetchOnFocus: true,
    pollingInterval: 3000,
  });

  return (
    <div className="grid gap-5 grid-cols-3">
      {data.data.map((book: IData) => (
        <SingleWishlistBook key={book._id} book={book} />
      ))}
    </div>
  );
};
export default MyWishlist;
