import React from "react";

const NoData = ({ message }) => {
  return (
    <div className="w-full p-2 h-36 flex justify-center items-center shadow-lg">
      <h1 className="text-md text-center font-bold text-black">{message}</h1>
    </div>
  );
};

export default NoData;
