import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/Reusables/LoadingSpinner/LoadingSpinner";

const PostDisplay = () => {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);
  console.log(post);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getPosts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        } else {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);
  return (
    <section className="bg-gray-50 min-h-screen p-2 md:p-6">
      {/* Post Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Title and category*/}
        <div className="px-6 pt-2 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800 mt-2 text-center">
            {post && post.title}
          </h1>

          <h1 className="text-sm text-gray-600 uppercase font-semibold">
            Category: {post && post.category}
          </h1>
        </div>

        {/* Post Image */}
        <div
          className="h-64 md:h-96 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              (post && post?.image) || "https://via.placeholder.com/800x400"
            })`,
          }}
        ></div>

        {/* Post Content */}
        <div className="p-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">
              {post && new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span className="text-sm text-gray-400">
              {post && (post.content.length / 1000).toFixed(0)} mins read
            </span>
          </div>

          {/* Content */}
          <div
            className="text-gray-600 mt-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post && post.content }}
          ></div>
        </div>
      </div>

      {/* Comment Section */}
      <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Comments</h2>
        <h3 className="text-gray-600 mb-4 text-sm">Signed in as </h3>
        {/* Add Comment */}
        <div className="border border-gray-400 rounded-md p-2 mb-6">
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Write your comment..."
          ></textarea>
          <div className="flex justify-between items-center">
            <p>200 comments remaining</p>
            <button className=" bg-blue-500 text-white p-2  rounded-lg hover:bg-blue-600 transition">
              Submit Comment
            </button>
          </div>
        </div>

        {/* Display Comments */}
        <div className="space-y-4">
          <p className="font-semibold flex">
            Comments{" "}
            <span className="flex justify-center border border-gray-400 w-6 h-6">
              4
            </span>
          </p>
          <div className="flex gap-x-2">
            {/* image */}
            <div className="">
              <img
                src="https://via.placeholder.com/40"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
            </div>
            {/* name,date and comment */}
            <div className="w-full">
              <div className="flex justify-start items-center gap-x-2">
                <p className="font-semibold text-md">Lesego</p>
                <p className="text-sm text-gray-400">a month ago</p>
              </div>
              <div>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Error voluptatum, quaerat, reprehenderit laboriosam
                  accusantium cumque assumenda nihil minima ab aut, dolorum
                  dignissimos quo aspernatur! Accusamus eius hic iusto voluptas
                  fugiat.
                </p>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <img
                src="https://via.placeholder.com/40"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <h3 className="font-semibold text-gray-800">Jane Smith</h3>
            </div>
            <p className="text-gray-600">
              Great insights! Can't wait to implement these ideas.
            </p>
          </div>
        </div>
      </div>
      {loading && <LoadingSpinner />}
    </section>
  );
};

export default PostDisplay;
