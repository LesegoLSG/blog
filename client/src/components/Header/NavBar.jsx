import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaUserPlus,
  FaSignInAlt,
} from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/theme/themeSlice";
import { signout } from "../../redux/user/userSlice";
import Logo1 from "../../assets/Logo/Logo1.png";
import Logo2 from "../../assets/Logo/Logo2.png";
import { LiaSignOutAltSolid } from "react-icons/lia";
import ColorMode from "../Reusables/buttons/ColorMode";
import ColorModeAlt from "../Reusables/buttons/ColorModeAlt";
import { useNavigates } from "../Context/NavContext";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { theme } = useSelector((state) => state.theme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { activeLink } = useNavigates();
  //slide out when scrolling down and slide back  when scrolling up consts
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  // const path = useLocation().pathname;
  const location = useLocation();

  //Show and hide searchbar
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  //Navbar visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setIsVisible(true); // always show at top
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false); // hide when scrolling down
      } else {
        setIsVisible(true); // show when scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  //for searchbar
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false); // Close the dropdown if clicked outside
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signout());
        setDropdownOpen(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handle submission of a search term
  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-4 py-2 md:px-16 border-b-2 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        theme === "light"
          ? "bg-white text-gray-800"
          : "bg-gray-900 text-gray-600"
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div>
          {theme === "light" ? (
            <img
              src={Logo1}
              alt="logo1"
              className="w-28 cursor-pointer"
              onClick={() => navigate("/")}
            />
          ) : (
            <img
              src={Logo2}
              alt="logo2"
              className="w-28 cursor-pointer"
              onClick={() => navigate("/")}
            />
          )}
        </div>

        {/* Search Bar */}
        <form
          className="hidden md:flex items-center border rounded-md px-2 bg-gray-100"
          onSubmit={handleSubmitSearch}
        >
          <input
            type="text"
            placeholder="Search..."
            className="outline-none bg-transparent px-2 py-1 w-64 text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="text-gray-600 cursor-pointer" />
        </form>

        {/* Links and Button for Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <ul
            className={`flex gap-4  font-semibold ${
              theme === "light" ? "text-gray-600" : "text-white"
            }`}
          >
            <li>
              <Link
                to="/"
                className={`${activeLink === "home" ? "underline" : ""}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`${activeLink === "about" ? "underline" : ""}`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className={`${activeLink === "search" ? "underline" : ""}`}
              >
                Blogs
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex gap-x-4">
          {currentUser ? (
            <div className="relative">
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
                <div
                  className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-lg py-2 z-10"
                  ref={dropdownRef}
                >
                  <p className="px-4 py-2 text-sm text-gray-700 font-semibold">
                    {currentUser.email}
                  </p>
                  <Link
                    onClick={() => setDropdownOpen(false)}
                    to="/dashboard?tab=profile"
                    className="flex gap-x-4 items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <ImProfile />
                    Profile
                  </Link>
                  <ColorMode toggleTheme={toggleTheme} />
                  <hr></hr>
                  {/* Sign out button */}

                  <button
                    onClick={() => handleSignOut()}
                    className="w-full flex items-center gap-x-2 text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LiaSignOutAltSolid size={20} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-x-4">
              <div className="text-sm underline flex justify-center items-center gap-x-1">
                <FaUserPlus />
                <Link to="/sign-up">Sign Up</Link>
              </div>

              <div className="text-sm underline flex justify-center items-center gap-x-1">
                <FaSignInAlt />
                <Link to="/sign-in">Sign In</Link>
              </div>

              <ColorModeAlt toggleTheme={toggleTheme} />
            </div>
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
          <div
            className={`absolute top-12 left-0 w-full shadow-lg flex flex-col items-center md:hidden z-50 ${
              theme === "light"
                ? "bg-white text-gray-800"
                : "bg-gray-900 text-white"
            }`}
          >
            <ul className="flex flex-col gap-4 font-semibold py-6">
              <li>
                <Link
                  to="/"
                  className={`${activeLink === "home" ? "underline" : ""}`}
                  onClick={toggleMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`${activeLink === "about" ? "underline" : ""}`}
                  onClick={toggleMenu}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className={`${activeLink === "search" ? "underline" : ""}`}
                  onClick={toggleMenu}
                >
                  Blogs
                </Link>
              </li>
            </ul>
            {!currentUser && (
              <div className="flex flex-col items-center gap-y-4 pb-10">
                <div className="text-sm underline flex justify-center items-center gap-x-1">
                  <FaUserPlus />
                  <Link to="/sign-up">Sign Up</Link>
                </div>

                <div className="text-sm underline flex justify-center items-center gap-x-1">
                  <FaSignInAlt />
                  <Link to="/sign-in">Sign In</Link>
                </div>

                <ColorMode toggleTheme={toggleTheme} className="bg-green-600" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Search Section */}
      <div className="md:hidden my-2 flex items-center justify-start">
        {/* Show Search Icon if bar is hidden */}
        {!showMobileSearch && (
          <button
            onClick={() => setShowMobileSearch(true)}
            className={`pt-1 rounded-md bg-blue-600 ${
              theme === "light"
                ? "bg-white text-gray-800"
                : "bg-gray-900 text-gray-600"
            }`}
          >
            <FaSearch size={18} />
          </button>
        )}

        {/* Show Search Bar when active */}
        {showMobileSearch && (
          <form
            className="flex items-center w-full bg-gray-100 shadow-sm rounded-md transition-all duration-300"
            onSubmit={handleSubmitSearch}
          >
            <input
              type="text"
              placeholder="Search"
              className="outline-none bg-transparent px-3 py-2 w-full text-black rounded-l-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
            >
              Search
            </button>
            {/* Optional close icon */}
            {/* <FaTimes
              className="ml-2 text-gray-600 cursor-pointer"
              onClick={() => setShowMobileSearch(false)}
            /> */}
          </form>
        )}
      </div>
    </header>
  );
};

export default NavBar;
