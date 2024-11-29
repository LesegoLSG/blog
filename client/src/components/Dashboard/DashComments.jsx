import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoData from "../Reusables/displays/NoData";
import ConfirmationBox from "../Reusables/displays/ConfirmationBox";

const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");
  console.log("Comments", comments);
  console.log("CommentIdToDelete:", commentIdToDelete);

  //   Get all comments
  useEffect(() => {
    if (currentUser && currentUser.isAdmin) {
      const fetchComments = async () => {
        try {
          const res = await fetch(`/api/comment/getcommentslist`);
          const data = await res.json();
          console.log("Data", data);
          if (res.ok) {
            setComments(data);
            if (data && data.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      if (currentUser.isAdmin) {
        fetchComments();
      }
    }
  }, [currentUser._id]);

  //   Show button functionality
  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/post/getposts?/userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // Open delete modal
  const handleOpenDeleteModal = (id) => {
    setShowDeleteModal(true);
    setCommentIdToDelete(id);
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  //   Delete user functionality
  const handleConfirmDelete = async (e) => {
    e.preventDefault();

    // setShowDeleteModal(false);
    if (!currentUser) return;

    try {
      const res = await fetch(
        `/api/comment/deletecomment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      console.log();
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comments) => comments._id !== commentIdToDelete)
        );
        setShowDeleteModal(false);
      } else {
        console.log("Error deleting a post:", data.message);
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <section
      className={`min-h-screen container mx-auto ${
        theme === "light"
          ? "bg-white text-gray-600"
          : "bg-neutral-800 text-white"
      }`}
    >
      <div className="p-4 max-w-full  overflow-x-auto">
        {currentUser.isAdmin && comments && comments.length > 0 ? (
          <>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr
                  className={`${
                    theme === "light"
                      ? "text-gray-600"
                      : "text-white bg-neutral-900"
                  }`}
                >
                  <th className="border border-gray-200 p-2">Date created</th>
                  <th className="border border-gray-200 p-2">
                    Comment Content
                  </th>
                  <th className="border border-gray-200 p-2">NO of likes</th>
                  <th className="border border-gray-200 p-2">User ID </th>
                  <th className="border border-gray-200 p-2">Post ID</th>

                  <th className="border border-gray-200 p-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr key={comment._id} className="text-center">
                    {/* Date */}
                    <td
                      className={`border-b p-2  text-sm font-semibold ${
                        theme === "light"
                          ? "border-gray-200"
                          : "border-gray-900"
                      }`}
                    >
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </td>

                    {/* Content */}
                    <td
                      className={`text-start border-b p-2 ${
                        theme === "light"
                          ? "border-gray-200"
                          : "border-gray-900"
                      }`}
                    >
                      {comment.content}
                    </td>
                    {/* No Of likes */}
                    <td
                      className={`border-b p-2 ${
                        theme === "light"
                          ? "border-gray-200"
                          : "border-gray-900"
                      }`}
                    >
                      {comment.numberOfLikes}
                    </td>
                    {/* User ID */}
                    <td
                      className={`border-b p-2 ${
                        theme === "light"
                          ? "border-gray-200"
                          : "border-gray-900"
                      }`}
                    >
                      {comment.userId}
                    </td>
                    {/* Post ID*/}
                    <td
                      className={`border-b p-2 ${
                        theme === "light"
                          ? "border-gray-200"
                          : "border-gray-900"
                      }`}
                    >
                      {comment.postId}
                    </td>
                    {/* Delete */}
                    <td
                      className={`border-b p-2 ${
                        theme === "light"
                          ? "border-gray-200"
                          : "border-gray-900"
                      }`}
                    >
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleOpenDeleteModal(comment._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showMore && (
              <div className="w-full flex justify-end items-center text-sm text-teal-600 my-2">
                <span className="cursor-pointer" onClick={handleShowMore}>
                  Show More
                </span>
              </div>
            )}
          </>
        ) : (
          <NoData message="No comments to display yet..." />
        )}
      </div>
      {showDeleteModal && (
        <ConfirmationBox
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this comment?"
        />
      )}
    </section>
  );
};

export default DashComments;
