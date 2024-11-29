import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostDashList = ({ posts }) => {
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  return (
    <div
      className={`w-full md:w-2/3 shadow-2xl rounded-lg ${
        theme === "light"
          ? "bg-white text-gray-600"
          : "bg-neutral-900 text-white"
      }`}
    >
      {/* header */}
      <div className="w-full flex justify-between items-center p-4">
        <h1 className="h2">Recent Posts</h1>
        <button
          className="button"
          onClick={() => navigate("/dashboard?tab=posts")}
        >
          View all
        </button>
      </div>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse s rounded-lg shadow-lg">
          <thead
            className={`${
              theme === "light"
                ? "bg-gray-300 text-gray-600"
                : "bg-gray-600 text-white"
            } transition-colors`}
          >
            <tr>
              <th className="p-2 text-left">Post Image</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Title</th>
            </tr>
          </thead>
          <tbody>
            {posts &&
              posts.map((post, index) => (
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
                      src={post.image}
                      alt={post.title}
                      className="h-12 w-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-2 font-semibold">{post.category}</td>
                  <td className="p-2">{post.title}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostDashList;
