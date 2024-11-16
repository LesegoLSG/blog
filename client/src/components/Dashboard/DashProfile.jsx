import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputField from "../Reusables/InputFields/InputField";
import {
  validateEmail,
  validateLettersOnly,
  validatePhoneNumber,
} from "../Reusables/Validations/InputValidation";
import { signout } from "../../redux/user/userSlice";

const DashProfile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();

  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    contact: currentUser.contact,
    email: currentUser.email,
    password: "",
  });

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  console.log(imageFileUrl);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signout());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-center font-bold text-xl mb-4">Profile</h1>

      <div className="w-full flex justify-center items-center">
        <form className="w-full md:w-1/2 space-y-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            className="hidden"
          />
          <div className="flex flex-col justify-center items-center">
            <img
              src={imageFileUrl || currentUser.profilePicture}
              alt="User"
              className="w-36 h-36 rounded-full cursor-pointer"
              onClick={() => filePickerRef.current.click()}
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
              <span onClick={handleSignOut}>Sign out</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashProfile;
