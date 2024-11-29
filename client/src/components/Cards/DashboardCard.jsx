import React from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import { useSelector } from "react-redux";

const DashboardCard = ({ title, count, lastMonthCount, icon }) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div
      className={` shadow-lg rounded-lg p-6 flex justify-between items-center space-x-4 ${
        theme === "light"
          ? "bg-white text-gray-600"
          : "bg-neutral-900 text-white"
      }`}
    >
      <div>
        <h3 className="text-lg font-semibold ">{title}</h3>
        <p className="text-2xl font-bold text-secondary">{count}</p>
        <p className="text-sm text-gray-400 flex items-center">
          <IoIosArrowRoundUp size={20} /> {lastMonthCount} last month
        </p>
      </div>
      <div className="text-secondary text-4xl">{icon}</div>
    </div>
  );
};

export default DashboardCard;
