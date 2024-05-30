import React, { useState } from "react";
import { Link, useNavigation } from "react-router-dom";
import { Input } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { login } from "../store/authSlice";

function Signup() {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const createAc = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ml-16">
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form className="card-body">
            <div className="form-control">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                {...register("name", {
                  required: true,
                })}
              />
              <Input
                label="Email "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <Input
                        label="Password "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Signup</button>
            </div>
          </form>
        </div>
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Singup now!</h1>
          <p className="py-6">
            Ready to share your story? Create your account now!
          </p>
          <p className="text-base">
            Already have any account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
