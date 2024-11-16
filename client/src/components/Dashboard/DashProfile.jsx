import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputField from "../Reusables/InputFields/InputField";
import {
  validateEmail,
  validateLettersOnly,
  validatePhoneNumber,
} from "../Reusables/Validations/InputValidation";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    contact: currentUser.contact,
    email: currentUser.email,
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-center font-bold text-xl mb-4">Profile</h1>

      <div className="w-full flex justify-center items-center">
        <form className="w-full md:w-1/2 space-y-6">
          <div className="flex justify-center items-center">
            <img
              src={currentUser.profilePicture}
              alt=""
              className="w-36 h-36 rounded-full"
            />
          </div>

          <div className="w-full space-y-4">
            <InputField
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              validate={validateLettersOnly}
              errorMessage="Only letters allowed"
            />
            <InputField
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              validate={validateLettersOnly}
              errorMessage={"Only letters allowed"}
            />
            <InputField
              name="contact"
              type="text"
              placeholder="Contact details"
              value={formData.contact}
              onChange={handleInputChange}
              validate={validatePhoneNumber}
              errorMessage="10 digits eg 0112223333"
            />
            <InputField
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              validate={validateEmail}
              errorMessage="Invalid email eg john@gmail.com"
            />
            <button className="bg-blue-400 p-2">Update</button>
            <div className="flex justify-between items-center">
              <span>Delete account</span>
              <span>Sign out</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashProfile;
