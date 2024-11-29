import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSideBar from "../components/Dashboard/DashSideBar";
import DashProfile from "../components/Dashboard/DashProfile";
import DashPosts from "../components/Dashboard/DashPosts";
import DashUsers from "../components/Dashboard/DashUsers";
import DashComments from "../components/Dashboard/DashComments";
import DashboardComp from "../components/Dashboard/DashboardComp";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const location = useLocation();
  const { theme } = useSelector((state) => state.theme);
  const [tab, setTab] = useState("profile");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <section className=" flex w-full">
      {/* SideBar */}
      <div className="flex">
        <DashSideBar />
      </div>
      {/* Profile */}
      <div
        className={`flex-1  ${
          theme === "light" ? "bg-white" : "bg-neutral-800"
        } `}
      >
        {tab === "dashboard" && <DashboardComp />}
        {tab === "profile" && <DashProfile />}
        {tab === "posts" && <DashPosts />}
        {tab === "users" && <DashUsers />}
        {tab === "comments" && <DashComments />}
      </div>
    </section>
  );
};

export default Dashboard;
