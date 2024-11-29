import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import ShareButton from "../Reusables/buttons/ShareButton";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  // Dynamically generate the URL based on the post's slug
  const currentURL = `${window.location.origin}/post/${post.slug}`;

  return (
    <div
      className={`max-w-md h-36 flex items-center gap-x-2 mx-auto bg-transparent shadow-md shadow-secondary rounded-lg overflow-hidden hover:scale-105 transition-shadow ease-in-out duration-500 p-2 ${
        theme === "light" ? "text-gray-600" : "text-white"
      }`}
    >
      {/* Image */}
      <div className="w-1/3 h-full">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover rounded-l-lg"
        />
      </div>

      {/* Content */}

      <div className="w-2/3 h-full grid grid-rows-[auto,1fr,auto]">
        {/* Date and category*/}
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-400 font-semibold">
            {moment.utc(post.createdAt).local().fromNow()}
          </p>
          <span className="text-xs uppercase text-white font-semibold p-1 bg-black rounded-tr-lg rounded-bl-lg">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <div className="py-0.5">
          <h2 className="text-[0.95rem] line-clamp-3">
            {post.title} Lesego Mhlongo i want to seesas scdsfsd cdssd sadasd sd
          </h2>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center relative">
          {/* Share Button */}
          <ShareButton
            shareUrl={currentURL}
            shareBtnSize={20}
            shareSocialIconsSize={24}
          />
          {/* Read More */}
          <span
            className="text-primary hover:underline text-sm cursor-pointer"
            onClick={() => navigate(`/post/${post.slug}`)}
          >
            Read More
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
