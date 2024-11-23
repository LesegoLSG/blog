import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommentCard from "./CommentCard";
import { useNavigate } from "react-router-dom";

const Comment = ({ postId }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  console.log("p", postId);
  console.log("Comments", comments);

  //   Get a comment from db
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getpostcomments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [postId]);

  //   Submit a comment
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
        setComments([data, ...comments]);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("sign-in");
        return;
      }

      const res = await fetch(`/api/comment/likecomment/${commentId}`, {
        method: "PUT",
      });

      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
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

      {comments.length === 0 ? (
        <div>
          <p className="font-semibold">No comments</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="font-semibold flex">
            Comments{" "}
            <span className="flex justify-center border border-gray-400 w-6 h-6">
              {comments.length}
            </span>
          </p>
          {/* Comments */}
          {comments.map((comment) => (
            <CommentCard
              key={comment._id}
              comment={comment}
              onLike={handleCommentLike}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
