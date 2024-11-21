import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NoData from "../Reusables/displays/NoData";
import ConfirmationBox from "../Reusables/displays/ConfirmationBox";

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  //   Get all users
  useEffect(() => {
    if (currentUser && currentUser.isAdmin) {
      const fetchUsers = async () => {
        try {
          const res = await fetch(
            `/api/user/getUsers?userId=${currentUser._id}`
          );
          const data = await res.json();
          console.log(data);
          if (res.ok) {
            setUsers(data.users);
            if (data.users.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      if (currentUser.isAdmin) {
        fetchUsers();
      }
    }
  }, [currentUser._id]);

  //   Show button functionality
  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?/userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
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
    setUserIdToDelete(id);
  };

  //   Delete user functionality
  const handleConfirmDelete = async (e) => {
    e.preventDefault();

    setShowDeleteModal(false);
    if (!currentUser) return;

    try {
      const res = await fetch(
        `/api/post/deleteUser/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
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
    <section className="min-h-screen container mx-auto">
      <div className="table-auto overflow-x-scroll md:mx-auto p-4 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
        {currentUser.isAdmin && users.length > 0 ? (
          <>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 p-2">Date created</th>
                  <th className="border border-gray-200 p-2">
                    Profile Picture
                  </th>
                  <th className="border border-gray-200 p-2">Full Name</th>
                  <th className="border border-gray-200 p-2">Email</th>
                  <th className="border border-gray-200 p-2">Contact</th>
                  <th className="border border-gray-200 p-2">Admin</th>
                  <th className="border border-gray-200 p-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="text-center">
                    {/* Date */}
                    <td className="border border-gray-200 ">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    {/* ProfilePicture */}
                    <td className="border border-gray-200">
                      <img
                        src={user.profilePicture}
                        alt={user.title}
                        className="w-16 h-16 object-cover rounded-full mx-auto"
                      />
                    </td>
                    {/* Full Name */}
                    <td className="border border-gray-200 p-2 ">
                      {user.firstName + " " + user.lastName}
                    </td>
                    {/* Email address */}
                    <td className="border border-gray-200 p-2">{user.email}</td>
                    {/* Contact */}
                    <td className="border border-gray-200 p-2">
                      {user.contact}
                    </td>
                    {/* isAdmin*/}
                    <td className="border border-gray-200 p-2">
                      {user.isAdmin ? "YES" : "No"}
                    </td>
                    {/* Delete */}
                    <td className="border border-gray-200">
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleOpenDeleteModal(user._id)}
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
          <NoData message="No users to display yet..." />
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

export default DashUsers;
