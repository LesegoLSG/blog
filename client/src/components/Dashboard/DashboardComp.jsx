import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserDashList from "./UserDashList";
import PostDashList from "./PostDashList";
import CommentDashList from "./CommentDashList";
import StatsDash from "./StatsDash";

const DashboardComp = () => {
  const { theme } = useSelector((state) => state.theme);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  const { currentUser } = useSelector((state) => state.user);
  console.log("isAdmin:", currentUser);
  console.log("users:", users);
  console.log("Posts:", posts);
  console.log("Comments", comments);

  console.log("Total users:", totalUsers);
  console.log("Total posts:", totalPosts);
  console.log("Total comments:", totalComments);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        } else {
          console.log(error.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        } else {
          console.log(error.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcommentslist");
        const data = await res.json();
        console.log("comment res", res);
        console.log("comment data", data);
        if (res.ok) {
          setComments(data);
          setTotalComments(data.length);
          setLastMonthComments(data.lastMonthComments);
        } else {
          console.log(error.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <section
      className={`w-full min-h-screen p-4 ${
        theme === "light"
          ? "bg-white text-gray-800"
          : "bg-neutral-900 text-white"
      }`}
    >
      <h1 className="h1 my-2">Dashboard</h1>
      {/* Dashboards cards */}
      <StatsDash
        totalUsers={totalUsers}
        totalPosts={totalPosts}
        totalComments={totalComments}
        lastMonthUsers={lastMonthUsers}
        lastMonthComments={lastMonthComments}
        lastMonthPosts={lastMonthPosts}
      />

      {/* Post and user section*/}
      <div className="w-full h-auto flex flex-col md:flex-row justify-center items-center my-4 space-y-4 md:space-x-4">
        {/* Posts */}
        <PostDashList posts={posts} />
        {/* Users */}
        <UserDashList users={users} />
      </div>

      {/* Comments section */}
      <CommentDashList comments={comments} />
    </section>
  );
};

export default DashboardComp;
