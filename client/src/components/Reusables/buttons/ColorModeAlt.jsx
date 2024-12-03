import React from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";

const ColorModeAlt = ({ toggleTheme }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  return (
    <button className="hidden md:block">
      {theme === "light" ? (
        <MdDarkMode
          className="cursor-pointer text-black"
          size={20}
          onClick={() => dispatch(toggleTheme())}
        />
      ) : (
        <MdLightMode
          className="cursor-pointer text-yellow-600"
          size={20}
          onClick={() => dispatch(toggleTheme())}
        />
      )}
    </button>
  );
};

export default ColorModeAlt;
