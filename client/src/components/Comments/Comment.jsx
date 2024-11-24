import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommentCard from "./CommentCard";
import { useNavigate } from "react-router-dom";
import ConfirmationBox from "../Reusables/displays/ConfirmationBox";

const Comment = ({ postId }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

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

  // update a comment
  const handleEdit = async (comment, editedContent) => {
    setComments((prevComments) =>
      prevComments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  // Delete a comment
  const handleDelete = async () => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
      }
      const res = await fetch(`/api/comment/deletecomment/${commentToDelete}`, {
        method: "DELETE",
      });

      console.log("res:", res);

      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.filter((comment) => comment._id !== commentToDelete)
        );
        console.log(data.message);
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log("Comment to delete:", commentToDelete);

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
      <h2 className="h1">Comments</h2>
      {currentUser ? (
        <div className="flex items-center gap-x-2 mb-4">
          <span className="h3">Signed in as:</span>
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
          <span className="h3">Please sign in to comment.</span>
          <button className="button">
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
          <button type="submit" className=" button">
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
          <p className="h3 flex">
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
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowDeleteModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </div>
      )}
      {/* Delete confirmation */}
      {showDeleteModal && (
        <ConfirmationBox
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          message="Are you sure you want to delete this comment? Please note deleted comment cannot be retrieved."
        />
      )}
    </div>
  );
};

export default Comment;
