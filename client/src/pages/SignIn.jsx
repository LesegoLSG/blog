import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/Reusables/InputFields/InputField";
import {
  validateEmail,
  validatePassword,
} from "../components/Reusables/Validations/InputValidation";

import Lesego from "../assets/Lesego.jpg";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/Reusables/LoadingSpinner/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuthBtn from "../components/Reusables/buttons/OAuthBtn";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const [serverError, setServerError] = useState(null);

  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    setSignIn({ ...signIn, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("sign in details: ", signIn);

    dispatch(signInStart());
    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signIn),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      navigate("/");

      const data = await response.json();
      console.log("Sign in data", data);
      dispatch(signInSuccess(data));
    } catch (error) {
      setServerError(error.message);
      dispatch(signInFailure());
    }
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center">
      {/* Left div */}
      <div className="hidden md:block w-1/2 h-full relative">
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h1 className="text-white text-3xl">Warm stay</h1>
          <h3 className="text-white text-xl">
            Enjoy the stay inour luxury hotel
          </h3>
        </div>
        <img src={Lesego} className="w-full h-full object-cover" />
      </div>
      {/* right div */}
      <div className="w-full md:w-1/2 h-full flex justify-center items-center p-6 md:p-32">
        <div className="w-full h-full flex flex-col">
          <h1 className="text-primary font-semibold text-3xl">
            Suite<span className="text-accent-hover">Spot</span>
          </h1>
          <div className="mt-12">
            <h1 className="text-gray-800 text-3xl">Login</h1>
            <h3 className="text-gray-800 text-xl">
              Welcome Back! Please enter your details
            </h3>
          </div>
          <form className="flex flex-col gap-y-4 mt-6" onSubmit={handleSignIn}>
            <InputField
              name="email"
              type="email"
              placeholder="Email Address"
              value={signIn.email}
              onChange={handleInputChange}
              validate={validateEmail}
              errorMessage="Invalid email address"
            />
            <InputField
              name="password"
              type="password"
              placeholder="Password"
              value={signIn.password}
              onChange={handleInputChange}
              validate={validatePassword}
              errorMessage="Minimum 6 characters with at least one letter, one digit, and one special character"
            />
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className=" text-primary" />
                Remember me
              </label>
              <p className="text-gray-700">Forgot password?</p>
            </div>
            {serverError && <p className="text-red-600">{serverError}</p>}
            <button className="button mt-2" type="submit">
              Login
            </button>

            {/* Divider with "or" */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-400" />
              <span className="px-4 text-gray-600">or</span>
              <hr className="flex-grow border-gray-400" />
            </div>

            {/* O Auth button */}

            <p className="text-gray-700">
              Don't have an account yet?
              <span className="font-semibold cursor-pointer">
                {" "}
                <Link to="/sign-up">Sign up for free</Link>
              </span>{" "}
            </p>
          </form>
          <OAuthBtn />
        </div>
      </div>
      {loading && <LoadingSpinner />}
    </section>
  );
};

export default SignIn;
