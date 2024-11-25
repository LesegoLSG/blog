import React from "react";
import { useNavigate } from "react-router-dom";

const UserDashList = ({ users }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full md:w-1/3 shadow-lg rounded-lg">
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
        <table className="w-full border-collapse bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="p-4 text-left">User Image</th>
              <th className="p-4 text-left">Full Name</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <tr
                  key={index}
                  className="even:bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <td className="p-4">
                    <img
                      src={user.profilePicture}
                      alt="profile-image"
                      className="h-12 w-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-4 text-gray-700">
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
