import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-2 space-y-2">
        {/* Date and category*/}
        <div className="flex justify-between items-center">
          <span className="text-xs uppercase text-gray-500 font-semibold">
            {post.category}
          </span>
          <p className="text-xs text-gray-500 font-semibold">
            {moment.utc(post.createdAt).local().fromNow()}
          </p>
        </div>

        {/* Title */}
        <div>
          <h2 className="h3 line-clamp-3">
            {post.title} Lesego Mhlongo i want to seesas scdsfsd cdssd sadasd sd
          </h2>
        </div>

        {/* Button */}
        <div className="text-center">
          <button
            className="button"
            onClick={() => navigate(`/post/${post.slug}`)}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
