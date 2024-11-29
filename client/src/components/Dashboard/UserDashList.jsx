import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserDashList = ({ users }) => {
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  return (
    <div
      className={`w-full md:w-1/3 shadow-lg rounded-lg ${
        theme === "light"
          ? "bg-white text-gray-600"
          : "bg-neutral-900 text-white"
      }`}
    >
      {/* header */}
      <div className="w-full flex justify-between items-center p-4">
        <h1 className="h2">Recent Users</h1>
        <button
          className="button"
          onClick={() => navigate("/dashboard?tab=users")}
        >
          View all
        </button>
      </div>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse  rounded-lg shadow-lg">
          <thead
            className={`${
              theme === "light"
                ? "bg-gray-300 text-gray-600"
                : "bg-gray-600 text-white"
            } transition-colors`}
          >
            <tr>
              <th className="p-2 text-left">User Image</th>
              <th className="p-2 text-left">Full Name</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <tr
                  key={index}
                  className={`${
                    theme === "light"
                      ? "even:bg-gray-100 hover:bg-gray-200"
                      : "even:bg-gray-500 hover:bg-gray-600"
                  } transition-colors`}
                >
                  <td className="p-2">
                    <img
                      src={user.profilePicture}
                      alt="profile-image"
                      className="h-12 w-12 object-cover rounded-full"
                    />
                  </td>
                  <td className="p-2 font-semibold">
                    {user.firstName} {user.lastName}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashList;
