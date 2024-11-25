import React from "react";
import { FaUsers, FaComments, FaClipboard } from "react-icons/fa";
import DashboardCard from "../Cards/DashboardCard";

const StatsDash = ({
  totalUsers,
  totalComments,
  totalPosts,
  lastMonthUsers,
  lastMonthPosts,
  lastMonthComments,
}) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <DashboardCard
          title="Total Users"
          count={totalUsers}
          lastMonthCount={lastMonthUsers}
          icon={<FaUsers />}
        />
        <DashboardCard
          title="Total Comments"
          count={totalComments}
          lastMonthCount={lastMonthComments}
          icon={<FaComments />}
        />
        <DashboardCard
          title="Total Posts"
          count={totalPosts}
          lastMonthCount={lastMonthPosts}
          icon={<FaClipboard />}
        />
      </div>
    </div>
  );
};

export default StatsDash;
