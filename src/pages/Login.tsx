/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { loginUser } from "../redux/features/user/UserSlice";

interface ILoginInput {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const { error, isError } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>();

  const onSubmit: SubmitHandler<ILoginInput> = async (data) => {
    await dispatch(loginUser({ email: data.email, password: data.password }));
  };

  return (
    <div className="flex justify-center items-center">
      <div className="p-10 rounded shadow-2xl md:w-1/3">
        <h4 className="text-teal-400 font-bold mb-5 text-3xl text-center uppercase">
          Login
        </h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="w-full border border-teal-400 p-3 rounded mb-3 focus:outline-0"
            placeholder="Enter your Email"
            type="email"
            {...register("email")}
          />
          <input
            className="w-full border border-teal-400 p-3 rounded mb-3 focus:outline-0"
            placeholder="Enter Your Password"
            type="password"
            {...register("password", { required: true })}
          />

          {/* errors will return when field validation fails  */}

          {errors.email && <span>This field is required</span>}
          {isError && error}

          <input
            className="bg-teal-400 rounded p-3 text-white w-full font-bold hover:bg-teal-300 focus:outline-0 focus:bg-teal-500"
            type="submit"
            value="Login"
          />
        </form>
        <p className="text-gray-400 font-semibold text-center mt-5">
          Are you register ? Please{" "}
          <Link className="text-teal-400 " to="/signup">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
