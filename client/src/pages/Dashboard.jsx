import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSideBar from "../components/Dashboard/DashSideBar";
import DashProfile from "../components/Dashboard/DashProfile";
import DashPosts from "../components/Dashboard/DashPosts";
import DashUsers from "../components/Dashboard/DashUsers";
import DashComments from "../components/Dashboard/DashComments";
import DashboardComp from "../components/Dashboard/DashboardComp";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("profile");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <section className="min-h-screen flex ">
      {/* SideBar */}
      <div>
        <DashSideBar />
      </div>
      {/* Profile */}
      <div className="flex-1 h-screen">
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
