import React, { useState, useEffect } from "react";
import moment from "moment";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useSelector } from "react-redux";

const CommentCard = ({ comment, onLike, onEdit, onDelete }) => {
  const [user, setUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [isEdit, setIsEdit] = useState(false);
  const [editedComment, setEditedComment] = useState("");

  // Retrieve user
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/getuser/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment.userId]);
  // Open text editor (textarea) and set the content to edit.
  const handleOpenEditEditor = () => {
    setIsEdit(true);
    setEditedComment(comment.content);
  };

  const handleSaveEditedComment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/comment/editcomment/${comment._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editedComment }),
      });

      if (res.ok) {
        setIsEdit(false);
        onEdit(comment, editedComment);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log("editedComment", editedComment);
  return (
    <div className="flex gap-x-2 border-b border-gray-00">
      {/* image */}
      <div className="">
        <img
          src={
            (user && user.profilePicture) || "https://via.placeholder.com/40"
          }
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
      {/* name,date and comment */}
      <div className="w-full">
        <div className="flex justify-start items-center gap-x-2">
          <span className="font-semibold text-md">
            {user ? `@${user.firstName}${user.lastName} ` : "anonymous"}
          </span>
          <span className="text-xs text-gray-400 truncate">
            {moment.utc(comment.createdAt).local().fromNow()}
          </span>
        </div>
        {/* Content */}
        <div className="my-2">
          {isEdit ? (
            <div className="border border-gray-400 rounded-md p-2 mb-6">
              <textarea
                className="w-full bg-gray-100 rounded-md resize-none focus:outline-none focus:bg-gray-200 p-2"
                rows={3}
                maxLength="200"
                onChange={(e) => setEditedComment(e.target.value)}
                value={editedComment}
              />
              <div className="flex justify-end items-center gap-x-2">
                <button
                  className="bg-blue-600 p-1 rounded-lg"
                  onClick={handleSaveEditedComment}
                >
                  Save
                </button>
                <button
                  className="bg-blue-600 p-1 rounded-lg"
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">{comment.content}</p>
          )}
        </div>
        {/* likes */}
        <div className="flex items-center gap-x-2">
          <button type="button" onClick={() => onLike(comment._id)}>
            {currentUser && comment.likes.includes(currentUser._id) ? (
              <BiSolidLike className="cursor-pointer text-blue-600 text-lg hover:scale-105 hover:text-gray-600" />
            ) : (
              <BiLike className="cursor-pointer text-lg hover:text-blue-600 hover:scale-150" />
            )}
          </button>
          <p className="text-gray-600 text-sm font-semibold">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                " " +
                (comment.numberOfLikes === 1 ? "Like" : "Likes")}
          </p>
          {/* Edit */}
          {currentUser &&
            (currentUser._id === comment.userId || currentUser.isAdmin) && (
              <>
                <button
                  className="text-gray-600 hover:underline text-sm font-semibold"
                  onClick={handleOpenEditEditor}
                >
                  Edit
                </button>
                <button
                  className="text-gray-600 hover:underline text-sm font-semibold"
                  onClick={() => onDelete(comment._id)}
                >
                  Delete
                </button>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
