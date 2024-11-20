import React from "react";

const NoData = ({ message }) => {
  return (
    <div className="w-1/3 h-36 flex justify-center items-center shadow-lg">
      <h1 className="text-md font-bold text-black">{message}</h1>
    </div>
  );
};

export default NoData;
