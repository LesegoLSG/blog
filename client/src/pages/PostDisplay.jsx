import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/Reusables/LoadingSpinner/LoadingSpinner";
import Comment from "../components/Comments/Comment";

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
      <Comment postId={post && post._id} />

      {loading && <LoadingSpinner />}
    </section>
  );
};

export default PostDisplay;
