import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/Reusables/InputFields/InputField";
import InputFieldEyeToggle from "../components/Reusables/InputFields/InputFieldEyeToggle";
import { FcGoogle } from "react-icons/fc";
import {
  validateEmail,
  validateLettersOnly,
  validatePhoneNumber,
  validatePassword,
} from "../components/Reusables/Validations/InputValidation";
import LoadingSpinner from "../components/Reusables/LoadingSpinner/LoadingSpinner";
import OAuthBtn from "../components/Reusables/buttons/OAuthBtn";
import { useSelector } from "react-redux";
import RegisterImage from "../assets/Logo/RegisterImage.png";

const SignUp = () => {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  const [signUp, setSignUp] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [oAuthError, setOAuthError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value.trim() });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setConfirmPasswordError(false);

    if (signUp.confirmPassword !== signUp.password) {
      setConfirmPasswordError(true);
      return;
    }

    // Create a new object without confirmPassword
    const { confirmPassword, ...signUpData } = signUp;

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log("Sign up data", data);
      setIsLoading(false);
      navigate(-1);
    } catch (error) {
      setServerError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <section
      className={`w-full min-h-screen flex pt-20 ${
        theme === "light"
          ? "bg-white text-gray-800"
          : "bg-neutral-900 text-white"
      }`}
    >
      {/* left div */}
      <div className="w-full h-auto  p-6 md:px-32">
        <div className="w-full h-auto flex flex-col">
          <div className="mt-12 space-y-2">
            <h1 className=" text-3xl font-semibold">Sign up</h1>
            <h3 className=" text-base">
              Create an account to enjoy exclusive benefits and stay connected!
            </h3>
          </div>
          <form className="flex flex-col gap-y-6 mt-6" onSubmit={handleSignUp}>
            {/* First and last name inputs*/}
            <div className="flex justify-center items-center gap-x-2">
              <InputField
                name="firstName"
                type="text"
                placeholder="First Name"
                value={signUp.firstName}
                onChange={handleInputChange}
                validate={validateLettersOnly}
                errorMessage="Only letters allowed"
              />
              <InputField
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={signUp.lastName}
                onChange={handleInputChange}
                validate={validateLettersOnly}
                errorMessage={"Only letters allowed"}
              />
            </div>

            {/* contact and email */}
            <div className="flex justify-center items-center gap-x-2">
              <InputField
                name="contact"
                type="text"
                placeholder="Contact details"
                value={signUp.contact}
                onChange={handleInputChange}
                validate={validatePhoneNumber}
                errorMessage="10 digits eg 0112223333"
              />
              <InputField
                name="email"
                type="email"
                placeholder="Email address"
                value={signUp.email}
                onChange={handleInputChange}
                validate={validateEmail}
                errorMessage="Invalid email eg john@gmail.com"
              />
            </div>
            {/* Password input */}
            <InputFieldEyeToggle
              name="password"
              type="password"
              placeholder="Password"
              value={signUp.password}
              onChange={handleInputChange}
              validate={validatePassword}
              errorMessage="Minimum 6 characters with at least one letter, one digit, and one special character"
            />

            {/*Confirm Password input */}
            <InputFieldEyeToggle
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={signUp.confirmPassword}
              onChange={handleInputChange}
              validate={validatePassword}
              errorMessage="6 Characters long, at least one letter, one digit and a special character"
            />
            {serverError && <p className="text-red-600">{serverError}</p>}
            {confirmPasswordError && (
              <p className="text-red-600">Passwords do not match.</p>
            )}

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2">
                <input type="checkbox" className=" text-primary" />
                Remember me
              </label>
              <p>Forgot password?</p>
            </div>
            <button className="button mt-2" type="submit">
              Sign up
            </button>

            {/* Divider with "or" */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-400" />
              <span className="px-4">or</span>
              <hr className="flex-grow border-gray-400" />
            </div>

            <OAuthBtn setOAuthError={setOAuthError} mode="signup" />
            {oAuthError && <p className="text-red-600">{oAuthError}</p>}

            <p className=" mb-4">
              Already have an account?
              <span className="font-semibold cursor-pointer underline">
                {" "}
                <Link to="/sign-in"> Sign In</Link>
              </span>{" "}
            </p>
          </form>
        </div>
      </div>
      {/* right div */}
      <div className="hidden md:block w-full h-auto ">
        <img src={RegisterImage} className="w-full h-full object-fit" />
      </div>
      {isLoading && <LoadingSpinner />}
    </section>
  );
};

export default SignUp;
