import React from "react";
import { IoIosArrowRoundUp } from "react-icons/io";

const DashboardCard = ({ title, count, lastMonthCount, icon }) => {
  return (
    <div className=" bg-white shadow-lg rounded-lg p-6 flex justify-between items-center space-x-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{count}</p>
        <p className="text-sm text-gray-500 flex items-center">
          <IoIosArrowRoundUp size={20} /> {lastMonthCount} last month
        </p>
      </div>
      <div className="text-blue-500 text-4xl">{icon}</div>
    </div>
  );
};

export default DashboardCard;
