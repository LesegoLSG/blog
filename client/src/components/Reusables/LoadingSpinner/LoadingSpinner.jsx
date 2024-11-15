import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-24 h-24">
        {/* Outer Ring */}
        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin-slow"></div>

        {/* Inner Ring */}
        <div className="absolute top-4 left-4 w-16 h-16 border-4 border-transparent border-b-blue-500 border-l-blue-500 rounded-full animate-spin-reverse"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
