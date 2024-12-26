import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoData from "../Reusables/displays/NoData";
import ConfirmationBox from "../Reusables/displays/ConfirmationBox";
import { MdDelete } from "react-icons/md";

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
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

  // Cancel delete
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  //   Delete user functionality
  const handleConfirmDelete = async (e) => {
    e.preventDefault();

    setShowDeleteModal(false);
    if (!currentUser) return;

    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
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
      className={`min-h-screen  ${
        theme === "light"
          ? "bg-white text-gray-800"
          : "bg-neutral-900 text-white"
      }`}
    >
      <h1 className="h1 p-4">Users</h1>
      <div className=" p-4 max-w-full  overflow-x-auto">
        {currentUser.isAdmin && users.length > 0 ? (
          <div>
            <table className=" border-collapse border border-gray-900 w-full ">
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
                    Profile Picture
                  </th>
                  <th className="border border-gray-200 p-2">Full Name</th>
                  <th className="border border-gray-200 p-2">Email</th>
                  <th className="border border-gray-200 p-2">Contact</th>
                  <th className="border border-gray-200 p-2">Admin</th>
                  <th className="border border-gray-200 p-2">Delete</th>
                </tr>
              </thead>
              <tbody
                className={`border-x ${
                  theme === "light" ? "border-gray-200" : "border-gray-900"
                }`}
              >
                {users.map((user) => (
                  <tr key={user._id} className="text-center">
                    {/* Date */}
                    <td
                      className={`border-b font-semibold ${
                        theme === "light"
                          ? "border-gray-200"
                          : "border-gray-900"
                      }`}
                    >
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    {/* ProfilePicture */}
                    <td
                      className={`border-b  ${
                        theme === "light"
                          ? "border-gray-200"
                          : "border-gray-900"
                      }`}
                    >
                      <img
                        src={user.profilePicture}
                        alt={user.title}
                        className="w-16 h-16 object-cover rounded-full mx-auto"
                      />
                    </td>
                    {/* Full Name */}
                    <td
                      className={`border-b  p-2 ${
                        theme === "light"
                          ? "border-gray-200"
                          : "border-gray-900"
                      }`}
                    >
                      {user.firstName + " " + user.lastName}
                    </td>
                    {/* Email address */}
                    <td
                      className={`border-b  p-2 ${
                        theme === "light"
                          ? "border-gray-200"
                          : "border-gray-900"
                      }`}
                    >
                      {user.email}
                    </td>
                    {/* Contact */}
                    <td
                      className={`border-b  p-2 ${
                        theme === "light"
                          ? "border-gray-200"
                          : "border-gray-900"
                      }`}
                    >
                      {user.contact}
                    </td>
                    {/* isAdmin*/}
                    <td
                      className={`border-b  p-2 ${
                        theme === "light"
                          ? "border-gray-200"
                          : "border-gray-900"
                      }`}
                    >
                      {user.isAdmin ? "YES" : "No"}
                    </td>
                    {/* Delete */}
                    <td
                      className={`border-b border-r-0 p-2 ${
                        theme === "light"
                          ? "border-gray-200"
                          : "border-gray-900"
                      }`}
                    >
                      <div className="flex justify-center items-center cursor-pointer">
                        <MdDelete
                          className="text-red-600 hover:underline"
                          onClick={() => handleOpenDeleteModal(user._id)}
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
          </div>
        ) : (
          <NoData message="No users to display yet..." />
        )}
      </div>
      {showDeleteModal && (
        <ConfirmationBox
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this user?"
        />
      )}
    </section>
  );
};

export default DashUsers;
