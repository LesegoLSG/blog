import React from "react";
import InputField from "../components/Reusables/InputFields/InputField";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  return (
    <section className="max-w-4xl mx-auto p-4 min-h-screen">
      <h1 className="text-lg font-bold text-center my-6">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          {/* Title input */}
          <InputField placeholder="Title" className="flex-1" />
          {/* Select programming language input */}
          <select
            id="language"
            name="language"
            className="border rounded-md p-2 w-full md:w-auto"
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
          <input type="file" accept="image/*" />
          <button className="bg-blue-400 p-2">Upload image</button>
        </div>
        return{" "}
        <ReactQuill
          theme="snow"
          placeholder="Content"
          className="h-72 mb-12"
          required={true}
        />
        <button className="p-4 bg-blue-400">Publish</button>
      </form>
    </section>
  );
};

export default CreatePost;
