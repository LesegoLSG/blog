import React, { useState, useEffect } from "react";
import moment from "moment";

const CommentCard = ({ comment }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/getuser/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment.userId]);

  return (
    <div className="flex gap-x-2 border-b border-gray-00">
      {/* image */}
      <div className="">
        <img
          src={
            (user && user.profilePicture) || "https://via.placeholder.com/40"
          }
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
      {/* name,date and comment */}
      <div className="w-full">
        <div className="flex justify-start items-center gap-x-2">
          <span className="font-semibold text-md">
            {user ? `@${user.firstName}${user.lastName} ` : "anonymous"}
          </span>
          <span className="text-sm text-gray-400 truncate">
            {moment.utc(comment.createdAt).local().fromNow()}
          </span>
        </div>
        <div className="my-2">
          <p className="text-sm text-gray-600">{comment.content}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
