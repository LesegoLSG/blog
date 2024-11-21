import React, { useEffect, useState } from "react";
import InputField from "../components/Reusables/InputFields/InputField";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { validateLength } from "../components/Reusables/Validations/InputValidation";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdatePost = () => {
  const { postId } = useParams();

  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadProgress] =
    useState(null);
  const [imageFileUploadingError, setImageFileUploadError] = useState(null);
  const [publishError, setPublishError] = useState();
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });

  useEffect(() => {
    fetchPost();
  }, [postId]);
  console.log("postId:", postId);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/post/getPosts?postId=${postId}`);
      const data = await res.json();
      if (res.ok) {
        setPublishError(null);
        setFormData(data.posts[0]);
      } else {
        setPublishError(data.message);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    try {
      if (!file) {
        setImageFileUploadError("Please select an image");
        return;
      }

      setImageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0));
          console.log("Upload progress:", imageFileUploadingProgress, progress);
        },
        (error) => {
          setImageFileUploadError(
            "Could not upload an image (file must be less than 2MB)"
          );
          setImageFileUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            setFormData({ ...formData, image: downloadURL });
            setImageFileUploadProgress(null);
            setImageFileUploadError(null);
          });
        }
      );
    } catch (error) {
      setImageFileUploadError("Error uploading an image, please try again...");
      setImageFileUploadProgress(null);
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    console.log("publish data:", formData);

    try {
      console.log("1");
      console.log("post id;;", formData._id);
      const res = await fetch(
        `/api/post/updatepost/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log("2");
      console.log("res:", res);
      const data = await res.json();
      console.log("3");
      console.log("data:", data);
      if (!res.ok) {
        setPublishError(data.message);
        return;
      } else {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }

      if (data) {
        console.log("Post created successfully");
      }
    } catch (error) {
      setPublishError("Error updating a post, please try again");
    }
  };
  return (
    <section className="max-w-4xl mx-auto p-4 min-h-screen">
      <h1 className="text-lg font-bold text-center my-6">Update post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleUpdatePost}>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          {/* Title input */}
          <InputField
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            validate={validateLength}
            errorMessage="Max length of your title should be less than 50"
            placeholder="Title"
            className="flex-1"
          />
          {/* Select programming language input (Category) */}
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="border rounded-md p-2 w-full md:w-auto"
            required={true}
          >
            <option value="" disabled selected>
              Select a language
            </option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="csharp">C#</option>
            <option value="php">PHP</option>
            <option value="ruby">Ruby</option>
          </select>
        </div>
        <div className="flex justify-between items-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="bg-blue-400 p-2"
            disabled={imageFileUploadingProgress}
            onClick={handleImageUpload}
          >
            {imageFileUploadingProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageFileUploadingProgress}
                  text={`${imageFileUploadingProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </button>
        </div>
        {/* Image error */}
        {imageFileUploadingError && (
          <p className="text-red-600 text-sm font-semibold text-center">
            {imageFileUploadingError}
          </p>
        )}
        {/* Display an image if formData.image is not null */}
        {formData.image && (
          <img src={formData.image} alt="image-display" className="h-72" />
        )}

        <ReactQuill
          theme="snow"
          placeholder="Write your post content"
          className="h-72 mb-12"
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
          value={formData.content}
          required={true}
        />

        {/* display publish error */}
        {publishError && (
          <p className="text-red-600 text-sm font-semibold text-center">
            {publishError}
          </p>
        )}
        <button
          className="p-4 bg-blue-400 cursor-pointer"
          disabled={!formData.image || imageFileUploadingProgress}
          type="submit"
        >
          Update Post
        </button>
      </form>
    </section>
  );
};

export default UpdatePost;
