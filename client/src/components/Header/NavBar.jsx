import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/theme/themeSlice";
import { signOut } from "../../redux/user/userSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSignOut = () => {
    dispatch(signOut());
    setDropdownOpen(false);
  };

  return (
    <header
      className={`w-full px-4 py-4 md:px-16 flex justify-between items-center ${
        theme === "light"
          ? "bg-white text-gray-800"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      {/* Logo */}
      <div>
        <h1 className="text-2xl font-bold text-blue-600">Lesego</h1>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center border rounded-md px-2 bg-gray-100">
        <input
          type="text"
          placeholder="Search..."
          className="outline-none bg-transparent px-2 py-1 w-64 text-black"
        />
        <FaSearch className="text-gray-600 cursor-pointer" />
      </div>

      {/* Links and Button for Desktop */}
      <div className="hidden md:flex items-center gap-6">
        <ul className="flex gap-4 text-black font-semibold">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-600">
              About
            </Link>
          </li>
          <li>
            <Link to="/projects" className="hover:text-blue-600">
              Projects
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex gap-x-4">
        {/* toggle */}
        <button
          className="p-2 bg-blue-400 cursor-pointer"
          onClick={() => dispatch(toggleTheme())}
        >
          light
        </button>
        {currentUser ? (
          <div className="relative">
            {/* <FaUserCircle
              onClick={toggleDropdown}
              className="text-2xl text-blue-600 cursor-pointer"
            /> */}
            <div className="w-12 h-12">
              <img
                alt="Picture"
                src={
                  currentUser.profilePicture ||
                  "https://via.placeholder.com/150"
                }
                className={`w-full h-full object-fit rounded-full cursor-pointer`}
                onClick={toggleDropdown}
              />
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-lg py-2 z-10">
                <p className="px-4 py-2 text-sm text-gray-700">
                  {currentUser.email}
                </p>
                <Link
                  to="/dashboard?tab=profile"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={() => handleSignOut()}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            <Link to="/sign-in">Sign In</Link>
          </button>
        )}

        {/* Mobile Menu Icon and avator*/}
        <div className="flex md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <FaTimes className="text-2xl text-blue-600" />
            ) : (
              <FaBars className="text-2xl text-blue-600" />
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center md:hidden">
          <ul className="flex flex-col gap-4 text-black font-semibold py-6">
            <li>
              <Link to="/" className="hover:text-blue-600" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-600"
                onClick={toggleMenu}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className="hover:text-blue-600"
                onClick={toggleMenu}
              >
                Projects
              </Link>
            </li>
          </ul>
          {!currentUser && (
            <button
              onClick={toggleMenu}
              className="bg-blue-600 text-white px-4 py-2 mb-4 rounded-md hover:bg-blue-700"
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default NavBar;
