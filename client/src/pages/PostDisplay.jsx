import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/Reusables/LoadingSpinner/LoadingSpinner";
import Comment from "../components/Comments/Comment";
import PostCard from "../components/Cards/PostCard";

const PostDisplay = () => {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);
  const [recentPosts, setRecentPosts] = useState(null);

  const [loading, setLoading] = useState(false);
  console.log(post);

  // Fetch post based on a slug
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

  // Fetch 3 recent posts
  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  console.log("recent", recentPosts);

  return (
    <section className=" bg-gray-50 min-h-screen p-2 md:p-6">
      {/* Post Container */}
      <div className="relative max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Title and category*/}

        <h1 className="title my-8">{post && post.title}</h1>

        <h1 className="absolute top-0 right-0 text-sm text-white uppercase font-bold bg-black p-1 rounded-bl-lg ">
          {post && post.category}
        </h1>

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
            className="text-gray-700 mt-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post && post.content }}
          ></div>
        </div>
      </div>

      {/* Comment Section */}
      <Comment postId={post && post._id} />

      {/* Recent posts */}
      <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
        <h1 className="h1">Recent Posts</h1>
        <div className="w-full grid grid-cols-3 gap-x-2">
          {recentPosts &&
            recentPosts.map((recentPost) => (
              <PostCard key={recentPost._id} recentPost={recentPost} />
            ))}
        </div>
      </div>

      {loading && <LoadingSpinner />}
    </section>
  );
};

export default PostDisplay;
