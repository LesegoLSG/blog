import React from "react";
import { useNavigate } from "react-router-dom";

const PostDashList = ({ posts }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full md:w-2/3 shadow-2xl rounded-lg">
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
        <table className="w-full border-collapse bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="p-4 text-left">Post Image</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Title</th>
            </tr>
          </thead>
          <tbody>
            {posts &&
              posts.map((post, index) => (
                <tr
                  key={index}
                  className="even:bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <td className="p-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-12 w-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-4 text-gray-700">{post.category}</td>
                  <td className="p-4 text-gray-800 font-medium">
                    {post.title}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostDashList;
