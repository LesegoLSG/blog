import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NoData from "../Reusables/displays/NoData";

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?/userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="min-h-screen container mx-auto">
      <div className="table-auto overflow-x-scroll md:mx-auto p-4 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
        {currentUser.isAdmin && userPosts.length > 0 ? (
          <>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 p-2">Date Published</th>
                  <th className="border border-gray-200 p-2">Post Image</th>
                  <th className="border border-gray-200 p-2">Post Title</th>
                  <th className="border border-gray-200 p-2">Category</th>
                  <th className="border border-gray-200 p-2">Edit</th>
                  <th className="border border-gray-200 p-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {userPosts.map((post) => (
                  <tr key={post._id} className="text-center">
                    <td className="border border-gray-200 ">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-200">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-16 object-cover mx-auto"
                      />
                    </td>
                    <td className="border border-gray-200 p-2 ">
                      <Link to={`/post/${post.slug}`}>{post.title}</Link>
                    </td>
                    <td className="border border-gray-200 p-2">
                      {post.category}
                    </td>
                    <td className="border border-gray-200 p-2">
                      <Link to={`/update-post/${post._id}`}>
                        <button className="text-blue-600 hover:underline">
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td className="border border-gray-200">
                      <Link to="/delete-post">
                        <button className="text-red-600 hover:underline">
                          Delete
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showMore && (
              <div className="w-full flex justify-end items-center text-sm text-teal-600 my-2">
                <span className="cursor-pointer" onClick={handleShowMore}>
                  Show More
                </span>
              </div>
            )}
          </>
        ) : (
          <NoData message="No post to display yet..." />
        )}
      </div>
    </section>
  );
};

export default DashPosts;
