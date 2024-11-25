import React from "react";
import { useNavigate } from "react-router-dom";

const CommentDashList = ({ comments }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full md:w-1/2 shadow-lg rounded-lg">
        {/* header */}
        <div className="w-full flex justify-between items-center p-4">
          <h1 className="h2">Recent Comments</h1>
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
                <th className="p-4 text-left">Comment</th>
                <th className="p-4 text-left">No of likes</th>
              </tr>
            </thead>
            <tbody>
              {comments &&
                comments.map((comment, index) => (
                  <tr
                    key={index}
                    className="even:bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <td className="p-4 text-gray-700">{comment.content}</td>
                    <td className="p-4 text-gray-700">
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
