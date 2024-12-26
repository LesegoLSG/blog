import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NoData from "../Reusables/displays/NoData";
import ConfirmationBox from "../Reusables/displays/ConfirmationBox";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  useEffect(() => {
    if (currentUser && currentUser.isAdmin) {
      const fetchPosts = async () => {
        try {
          const res = await fetch(
            `/api/post/getposts?userId=${currentUser._id}`
          );
          const data = await res.json();
          console.log(data);
          if (res.ok) {
            setUserPosts(data.posts);
            if (data.posts.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      if (currentUser.isAdmin) {
        fetchPosts();
      }
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?/userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOpenDeleteModal = (id) => {
    setShowDeleteModal(true);
    setPostIdToDelete(id);
  };

  const handleConfirmDelete = async (e) => {
    e.preventDefault();

    setShowDeleteModal(false);
    if (!currentUser) return;

    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      } else {
        console.log("Error deleting a post:", data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <section
      className={`min-h-screen ${
        theme === "light"
          ? "bg-white text-gray-800"
          : "bg-neutral-900 text-white"
      }`}
    >
      <h1 className="h1 p-4">Dashboard</h1>
      <div className="p-4 max-w-full  overflow-x-auto">
        {currentUser.isAdmin && userPosts.length > 0 ? (
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
                  <th className="border border-gray-200 p-2">Date Published</th>
                  <th className="border border-gray-200 p-2">Post Image</th>
                  <th className="border border-gray-200 p-2">Post Title</th>
                  <th className="border border-gray-200 p-2">Category</th>
                  <th className="border border-gray-200 p-2">Edit</th>
                  <th className="border border-gray-200 p-2">Delete</th>
                </tr>
              </thead>
              <tbody
                className={`border-x ${
                  theme === "light" ? "border-gray-200" : "border-gray-900"
                }`}
              >
                {userPosts.map((post) => (
                  <tr key={post._id} className="text-center">
                    <td
                      className={`border-b  font-semibold ${
                        theme === "light"
                          ? "border-gray-200"
                          : "border-gray-900"
                      }`}
                    >
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td
                      className={`border-b  ${
                        theme === "light"
                          ? "border-gray-200"
                          : "border-gray-900"
                      }`}
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-16 object-cover mx-auto"
                      />
                    </td>
                    <td
                      className={`border-b  ${
                        theme === "light"
                          ? "border-gray-200"
                          : "border-gray-900"
                      }`}
                    >
                      <Link to={`/post/${post.slug}`}>{post.title}</Link>
                    </td>
                    <td
                      className={`border-b  ${
                        theme === "light"
                          ? "border-gray-200"
                          : "border-gray-900"
                      }`}
                    >
                      {post.category}
                    </td>
                    <td
                      className={`border-b  ${
                        theme === "light"
                          ? "border-gray-200"
                          : "border-gray-900"
                      }`}
                    >
                      <div className="flex justify-center items-center">
                        <Link to={`/update-post/${post._id}`}>
                          <FaEdit size={20} className="text-green-600" />
                        </Link>
                      </div>
                    </td>
                    <td
                      className={`border-b  ${
                        theme === "light"
                          ? "border-gray-200"
                          : "border-gray-900"
                      }`}
                    >
                      <div className="flex justify-center items-center">
                        <MdDelete
                          className="text-red-600 hover:underline cursor-pointer"
                          onClick={() => handleOpenDeleteModal(post._id)}
                          size={20}
                        />
                      </div>
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
          <NoData message="No post to display yet..." />
        )}
      </div>
      {showDeleteModal && (
        <ConfirmationBox
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this post?"
        />
      )}
    </section>
  );
};

export default DashPosts;
