import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/Reusables/LoadingSpinner/LoadingSpinner";
import Comment from "../components/Comments/Comment";
import PostCard from "../components/Cards/PostCard";
import ShareButton from "../components/Reusables/buttons/ShareButton";
import { useSelector } from "react-redux";
import CallToAction from "../components/CallToAction/CallToAction";

const PostDisplay = () => {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);
  const [recentPosts, setRecentPosts] = useState(null);
  const { theme } = useSelector((state) => state.theme);

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

  // Dynamically generate the URL based on the post's slug
  const currentURL = `${window.location.origin}/post/${postSlug}`;

  return (
    <section
      className={`  min-h-screen p-2 md:p-6 pt-20 ${
        theme === "light"
          ? "bg-gray-50 text-gray-800"
          : "bg-neutral-900 text-white"
      }`}
    >
      {/* Post Container */}
      <div
        className={`relative max-w-4xl mx-auto  shadow-lg rounded-lg overflow-hidden ${
          theme === "light" ? "bg-white" : "bg-neutral-800"
        }`}
      >
        {/* Title and category*/}

        <h1 className="h1 text-center my-8">{post && post.title}</h1>

        <h1 className="absolute top-0 right-0 text-sm uppercase font-bold bg-black text-white p-1 rounded-bl-lg ">
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
        <div className="p-2 md:p-6">
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
            className="mt-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post && post.content }}
          ></div>
        </div>
        <div className="relative px-6">
          <ShareButton
            shareUrl={currentURL}
            shareBtnSize={30}
            shareSocialIconsSize={30}
          />
        </div>
      </div>

      {/* Comment Section */}
      <Comment postId={post && post._id} />

      {/* Recent posts */}
      <div
        className={`max-w-4xl mx-auto mt-8  shadow-lg rounded-lg p-2 md:p-6  ${
          theme === "light" ? "bg-white" : "bg-neutral-800"
        }`}
      >
        <h1 className="h1 mb-4">Recent Posts</h1>
        <div className="w-full grid grid-col-1 md:grid-cols-3 gap-2">
          {recentPosts &&
            recentPosts.map((recentPost) => (
              <PostCard key={recentPost._id} post={recentPost} />
            ))}
        </div>
        {/* Call To Action */}
        <div className="w-full my-4">
          <CallToAction />
        </div>
      </div>

      {loading && <LoadingSpinner />}
    </section>
  );
};

export default PostDisplay;
