import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Comment = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    console.log("comment", comment);
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Comments</h2>
      {currentUser ? (
        <div className="flex items-center gap-x-2 mb-4">
          <span>Signed in as:</span>
          <img
            src={currentUser.profilePicture}
            alt="user Image"
            className="w-10 h-10 rounded-full"
          />

          <span className="font-bold text-gray-600 text-sm">
            <Link to="/dashboard?tab=profile">
              {currentUser.lastName} {currentUser.firstName}
            </Link>
          </span>
        </div>
      ) : (
        <div className="flex justify-start items-center mb-2">
          <span>Please sign in to comment.</span>
          <button className="p-2 bg-blue-600">
            <Link to="/sign-in">Sign In</Link>
          </button>
        </div>
      )}

      {/* Add Comment */}
      <form
        className="border border-gray-400 rounded-md p-2 mb-6"
        onSubmit={handleSubmitComment}
      >
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-500"
          rows="4"
          placeholder="Write your comment..."
          maxLength="200"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        ></textarea>
        <div className="flex justify-between items-center">
          <p>{200 - comment.length} characters remaining</p>
          <button
            type="submit"
            className=" bg-blue-500 text-white p-2  rounded-lg hover:bg-blue-600 transition"
          >
            Submit Comment
          </button>
        </div>
      </form>
      <div className="space-y-4">
        <p className="font-semibold flex">
          Comments{" "}
          <span className="flex justify-center border border-gray-400 w-6 h-6">
            4
          </span>
        </p>
        <div className="flex gap-x-2">
          {/* image */}
          <div className="">
            <img
              src="https://via.placeholder.com/40"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
          {/* name,date and comment */}
          <div className="w-full">
            <div className="flex justify-start items-center gap-x-2">
              <p className="font-semibold text-md">Lesego</p>
              <p className="text-sm text-gray-400">a month ago</p>
            </div>
            <div>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
                voluptatum, quaerat, reprehenderit laboriosam accusantium cumque
                assumenda nihil minima ab aut, dolorum dignissimos quo
                aspernatur! Accusamus eius hic iusto voluptas fugiat.
              </p>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <img
              src="https://via.placeholder.com/40"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <h3 className="font-semibold text-gray-800">Jane Smith</h3>
          </div>
          <p className="text-gray-600">
            Great insights! Can't wait to implement these ideas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
