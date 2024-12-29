import React from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";

const ColorMode = ({ toggleTheme }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  return (
    <button className="w-full text-left px-4 py-2">
      {theme === "light" ? (
        <div
          className="flex items-center gap-x-2"
          onClick={() => dispatch(toggleTheme())}
        >
          <MdDarkMode className="cursor-pointer text-black" size={20} />
          <span className="text-sm font-semibold">Dark Mode</span>
        </div>
      ) : (
        <div
          className="flex items-center gap-x-2"
          onClick={() => dispatch(toggleTheme())}
        >
          <MdLightMode className="cursor-pointer text-yellow-600" size={20} />
          <span className="text-sm">Light Mode</span>
        </div>
      )}
    </button>
  );
};

export default ColorMode;
