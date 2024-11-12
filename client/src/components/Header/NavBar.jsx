import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="w-full bg-white shadow-md px-4 py-4 md:px-16 flex justify-between items-center">
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
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Sign In
        </button>
      </div>

      {/* Mobile Menu Icon */}
      <div className="flex md:hidden">
        <button onClick={toggleMenu}>
          {menuOpen ? (
            <FaTimes className="text-2xl text-blue-600" />
          ) : (
            <FaBars className="text-2xl text-blue-600" />
          )}
        </button>
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
          <button
            onClick={toggleMenu}
            className="bg-blue-600 text-white px-4 py-2 mb-4 rounded-md hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>
      )}
    </header>
  );
};

export default NavBar;
