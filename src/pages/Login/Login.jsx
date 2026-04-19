import React from "react";
import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from "react-router";

import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInuser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    signInuser(data.email, data.password)
      .then(() => {
        navigate(location?.state || "/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl mt-10">
      <h3 className="text-3xl text-center font-semibold mt-4">
        Welcome Back
      </h3>
      <p className="text-center mb-2 text-gray-600">Please Login</p>

      <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset space-y-3">

          {/* Email */}
          <label className="label font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Your Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}

          {/* Password */}
          <label className="label font-medium">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500 text-sm">
              Password must be at least 6 characters
            </p>
          )}

          <div className="text-right">
            <Link to={"/resetPassword"} className="link link-hover text-sm text-blue-600">
              Forgot password?
            </Link>
          </div>

          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>

        <p className="text-center">
          New to CodeShare?{" "}
          <Link
            state={location.state}
            to={"/register"}
            className="text-blue-700 underline"
          >
            Register
          </Link>
        </p>
      </form>

      <SocialLogin />
    </div>
  );
};

export default Login;
