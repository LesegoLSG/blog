import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CommentDashList = ({ comments }) => {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={`w-full flex justify-center items-center `}>
      <div
        className={`w-full md:w-1/2 shadow-lg rounded-lg  ${
          theme === "light"
            ? "bg-white text-gray-600"
            : "bg-neutral-900 text-white"
        }`}
      >
        {/* header */}
        <div className="w-full flex justify-between items-center p-4">
          <h1 className="h2">Recent Comments</h1>
          <button
            className="button"
            onClick={() => navigate("/dashboard?tab=comments")}
          >
            View all
          </button>
        </div>
        {/* table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg shadow-lg">
            <thead
              className={`${
                theme === "light"
                  ? "bg-gray-300 text-gray-600"
                  : "bg-gray-600 text-white"
              } transition-colors`}
            >
              <tr>
                <th className="p-4 text-left">Comment</th>
                <th className="p-4 text-left">No of likes</th>
              </tr>
            </thead>
            <tbody>
              {comments &&
                comments.map((comment, index) => (
                  <tr
                    key={index}
                    className={`${
                      theme === "light"
                        ? "even:bg-gray-100 hover:bg-gray-200"
                        : "even:bg-gray-500 hover:bg-gray-600"
                    } transition-colors`}
                  >
                    <td className="p-4 ">{comment.content}</td>
                    <td className="p-4 font-semibold">
                      {comment.numberOfLikes}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommentDashList;
