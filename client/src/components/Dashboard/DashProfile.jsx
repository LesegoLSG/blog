import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputField from "../Reusables/InputFields/InputField";
import InputFieldEyeToggle from "../Reusables/InputFields/InputFieldEyeToggle";
import {
  validateEmail,
  validateLettersOnly,
  validatePhoneNumber,
  validatePassword,
} from "../Reusables/Validations/InputValidation";
import { useNavigate } from "react-router-dom";
import { signout } from "../../redux/user/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../../redux/user/userSlice";
import LoadingSpinner from "../Reusables/LoadingSpinner/LoadingSpinner";

const DashProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadProgress] =
    useState(null);
  const [imageFileUploadingError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();

  console.log("Checking", imageFileUploadingProgress, imageFileUploadingError);

  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    contact: currentUser.contact,
    email: currentUser.email,
    password: currentUser.password,
  });

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    console.log("file name:", fileName);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload an image (file must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          console.log("Download Url:", downloadURL);
        });
      }
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  // console.log(imageFileUrl);

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
  console.log("formData:", formData);
  const submitUpdatedData = async (e) => {
    e.preventDefault();
    console.log("formData:", formData);
    if (Object.keys(formData).length === 0) {
      return;
    }

    try {
      dispatch(updateStart());
      console.log("dispatch started");
      console.log("User id:", currentUser._id);
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("data:", data);
      if (!res.ok) {
        dispatch(updateFailure());
      } else {
        dispatch(updateSuccess(data));
      }
    } catch (error) {
      dispatch(updateFailure());
    }
  };

  return (
    <section
      className={`w-full h-auto md:min-h-[110vh] p-4 ${
        theme === "light"
          ? "bg-white text-gray-800"
          : "bg-neutral-900 text-white"
      }`}
    >
      <h1 className="text-center font-bold text-xl mb-4">Profile</h1>

      <div className="w-full flex flex-col justify-center items-center">
        <form
          className="w-full md:w-1/2 space-y-6"
          onSubmit={submitUpdatedData}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            className="hidden"
          />
          <div className="relative flex flex-col justify-center items-center">
            {imageFileUploadingProgress && (
              <CircularProgressbar
                value={imageFileUploadingProgress}
                text={`${imageFileUploadingProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62,152,199, ${
                      imageFileUploadingProgress / 100
                    })`,
                  },
                }}
              />
            )}
            <img
              src={imageFileUrl || currentUser.profilePicture}
              alt="User"
              className={`w-36 h-36 rounded-full cursor-pointer ${
                imageFileUploadingProgress &&
                imageFileUploadingProgress < 100 &&
                "opacity-50"
              }`}
              onClick={() => filePickerRef.current.click()}
            />
          </div>
          {imageFileUploadingError && (
            <p className="text-red-600 text-sm font-semibold text-center">
              {imageFileUploadingError}
            </p>
          )}

          <div className="w-full space-y-8">
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
            <InputFieldEyeToggle
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              validate={validatePassword}
              errorMessage="Minimum 6 characters with at least one letter, one digit, and one special character"
            />
            {currentUser.isAdmin && (
              <button
                className="w-full button"
                onClick={() => navigate("/create-post")}
              >
                Create a post
              </button>
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
            <button type="submit" className="button">
              Update
            </button>
            <span className="button-cancel">Delete account</span>
          </div>
        </form>
        <div className="w-full md:w-1/2 space-y-6"></div>
      </div>
      {loading && <LoadingSpinner />}
    </section>
  );
};

export default DashProfile;
