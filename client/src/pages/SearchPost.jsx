import React, { useState, useEffect } from "react";
import Filter from "../components/Reusables/Filters/Filter";
import PostCard from "../components/Cards/PostCard";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/Reusables/LoadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";

const SearchPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    order: "asc",
    category: "",
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState("");

  // Handle input change
  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSearchData({ ...searchData, searchTerm: e.target.value });
    }
    if (e.target.id === "order") {
      const order = e.target.value || "asc";
      setSearchData({ ...searchData, order: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "";
      setSearchData({ ...searchData, category });
    }
  };

  //   Get data from URL params and fetch posts
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFomUrl = urlParams.get("searchTerm") || "";
    const orderFromUrl = urlParams.get("order") || "asc";
    const categoryFromUrl = urlParams.get("category") || "";

    if (searchTermFomUrl || orderFromUrl || categoryFromUrl) {
      setSearchData({
        ...searchData,
        searchTerm: searchTermFomUrl,
        order: orderFromUrl,
        category: categoryFromUrl,
      });
    }

    //  Retrieve posts api
    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      console.log("searchQuery", searchQuery);
      console.log;
      try {
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        console.log("res", res);
        if (!res.ok) {
          setLoading(false);
          return;
        } else {
          const data = await res.json();
          console.log("Fetched Data:", data);
          console.log("Fetched Data other:", data.posts);
          console.log("Fetched Data length:", data.posts.length);
          setPosts(data.posts);
          setLoading(false);
          if (data.posts.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      } catch (error) {
        setLoading(false);
        setPosts([]);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [location.search]);

  console.log(searchData);
  console.log("posts", posts);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchData.searchTerm);
    urlParams.set("order", searchData.order);
    urlParams.set("category", searchData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPOsts = posts.length;
    const startIndex = numberOfPOsts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    try {
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        return;
      } else {
        const data = await res.json();
        setPosts([...posts, ...data.posts]);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside
        className={`w-full md:w-1/5 p-4 ${
          theme === "light" ? "bg-accent" : "bg-neutral-900"
        }`}
      >
        <Filter
          searchData={searchData}
          handleChange={handleChange}
          handleSearchSubmit={handleSearchSubmit}
        />
      </aside>

      {/* Main Content */}
      <main
        className={`w-full md:w-4/5 p-4 ${
          theme === "light"
            ? "bg-white text-gray-800"
            : "bg-neutral-800 text-white"
        }`}
      >
        <h1 className="text-start h1 mb-4">Posts:</h1>
        {!loading && posts.length === 0 && (
          <div className="w-full h-96 flex justify-center items-center">
            <h1 className="h1">Sorry...No search found.</h1>
          </div>
        )}
        {loading && (
          <div className="w-full h-96 flex justify-center items-center">
            <h1 className="h1">Loading</h1>
          </div>
        )}
        {!loading && posts && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        )}
        {showMore && (
          <div className="w-full flex justify-end items-center text-sm text-teal-600 my-2">
            <span className="cursor-pointer" onClick={handleShowMore}>
              Show More
            </span>
          </div>
        )}
      </main>
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default SearchPost;
