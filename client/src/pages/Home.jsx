import React, { useState, useEffect } from "react";
import BannerImage from "../assets/HomePageImage/BannerImage.jpg";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/Cards/PostCard";
import NoData from "../components/Reusables/displays/NoData";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  console.log("posts:", posts);

  // Scrolling to a section
  const scrollToRef = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      className={`w-full  min-h-screen  ${
        theme === "light"
          ? "bg-white text-gray-600"
          : "bg-neutral-900 text-white"
      }`}
    >
      <div className="container mx-auto max-w-7xl ">
        <div className="w-full flex flex-col justify-center items-center gap-y-16 min-h-60  pt-4">
          <span className="text-sm font-semibold">
            Stay Informed, Stay Inspired
          </span>
          <h1 className="text-4xl font-extrabold max-w-3xl text-center">
            Empowering Developers With Cutting-Edge Insights
          </h1>
          <p className="font-semibold text-center">
            Sharing the latest in programming trends, full-stack development
            insights, and tech innovation
          </p>
          <div className="flex gap-x-4">
            <button
              className="button-alt"
              onClick={() => scrollToRef("recent-posts")}
            >
              What’s New
            </button>
            <button className="button" onClick={() => navigate("/search")}>
              Explore Now
            </button>
          </div>
          <div className="w-full h-96  p-1">
            <div className="w-full h-full p-1 border border-accent rounded-xl ">
              <img
                src={BannerImage}
                alt="banner-image"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
          {/* Post Cards display */}
          <div className="w-full h-auto" id="recent-posts">
            <h1 className="h1 text-center my-4">Recent Posts</h1>
            {posts && posts.length > 0 ? (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <div className="w-full flex justify-center items-center">
                <NoData message="Our system is currently under maintainance, please try again later." />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
