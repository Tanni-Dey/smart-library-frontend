/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createUser } from "../redux/features/user/UserSlice";

interface ISignUpInput {
  email: string;
  password: string;
  confirmPassword?: string;
}

const Signup = () => {
  const dispatch = useAppDispatch();
  const { error, isError } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpInput>();

  const onSubmit: SubmitHandler<ISignUpInput> = async (data) => {
    await dispatch(createUser({ email: data.email, password: data.password }));
  };
  return (
    <div className="flex justify-center items-center">
      <div className="p-10 rounded shadow-2xl md:w-1/3">
        <h4 className="text-teal-400 font-bold mb-5 text-3xl text-center uppercase">
          Sign Up
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
          <input
            className="w-full border border-teal-400 p-3 rounded mb-3 focus:outline-0"
            placeholder="Enter Confirm  Password"
            type="password"
            {...register("confirmPassword", { required: true })}
          />

          {/* errors will return when field validation fails  */}

          {errors.email && <span>This field is required</span>}
          {isError && error}

          <input
            className="bg-teal-400 rounded p-3 text-white w-full font-bold hover:bg-teal-300 focus:outline-0 focus:bg-teal-500"
            type="submit"
            value="Sign Up"
          />
        </form>
        <p className="text-gray-400 font-semibold text-center mt-5">
          Already Have an account? Please{" "}
          <Link className="text-teal-400 " to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
