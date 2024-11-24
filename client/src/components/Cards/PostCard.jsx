import React from "react";
import { useNavigate } from "react-router-dom";

const PostCard = ({ recentPost }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <img
        src={recentPost.image}
        alt={recentPost.title}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-2 space-y-2">
        {/* Date and category*/}
        <div className="flex justify-between items-center">
          <span className="text-xs uppercase text-gray-500 font-semibold">
            {recentPost.category}
          </span>
          <p className="text-xs text-gray-500 font-semibold">11/02/23</p>
        </div>

        {/* Title */}
        <div>
          <h2 className="h2">
            {recentPost.title} Lesego Mhlongo i want to see
          </h2>
        </div>

        {/* Button */}
        <div className="text-center">
          <button
            className="button"
            onClick={() => navigate(`/post/${recentPost.slug}`)}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
