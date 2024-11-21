import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { SiBloglovin } from "react-icons/si";
import { RiMoreFill, RiLogoutCircleLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const DashSideBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const [tab, setTab] = useState("profile");
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const menus = [
    { title: "Dashboard", icon: <MdOutlineDashboard />, path: "/portal" },
    {
      title: "Profile",
      icon: <FaUserFriends />,
      path: "/dashboard?tab=profile",
    },
    // Show post tab to the admin user only
    ...(currentUser?.isAdmin
      ? [
          {
            title: "Posts",
            icon: <SiBloglovin />,
            path: "/dashboard?tab=posts",
          },
          {
            title: "Users",
            icon: <MdOutlineDashboard />,
            path: "/dashboard?tab=users",
          },
        ]
      : []),

    {
      title: "More Tab 2",
      icon: <MdOutlineDashboard />,
      path: "/portal/more2",
    },
  ];

  // Split the menus into "main" and "more"
  const mainMenus = menus.slice(0, 3);
  const moreMenus = menus.slice(3);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          open ? "w-72" : "w-20"
        } duration-300 h-screen p-5 pt-8 bg-[#1f2536] relative hidden sm:block`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 bg-blue-200 text-2xl"
        >
          {open ? "←" : "→"}
        </button>
        <div className="flex gap-x-4 items-center">
          <h1 className={`cursor-pointer duration-500`}>Logo</h1>
          <h1
            className={`text-white origin-left font-medium text-xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            Designer
          </h1>
        </div>
        <ul className="h-[44rem] pt-6 text-left">
          {menus.map((menu, index) => (
            <li key={index} className="w-full p-2 mb-2 rounded-md">
              <Link
                to={menu.path}
                className="flex items-center gap-x-4 cursor-pointer"
              >
                <div className="text-white hover:text-blue-200 text-lg font-medium item-center flex justify-start gap-x-4 cursor-pointer rounded-md">
                  {menu.icon}
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {menu.title}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Menu */}
      <div className="fixed bottom-0 left-0 w-full bg-[#1f2536] p-3 sm:hidden flex justify-between items-center">
        {mainMenus.map((menu, index) => (
          <Link
            key={index}
            to={menu.path}
            className="flex flex-col items-center text-white"
          >
            {menu.icon}
            <span className="text-sm">{menu.title}</span>
          </Link>
        ))}
        {moreMenus.length > 0 && (
          <button
            onClick={() => setShowMoreOptions(!showMoreOptions)}
            className="flex flex-col items-center text-white"
          >
            <RiMoreFill size={24} />
            <span className="text-sm">More</span>
          </button>
        )}
      </div>

      {/* More Options Menu */}
      {showMoreOptions && (
        <div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-16 left-0 w-full bg-[#1f2536] p-3 sm:hidden"
        >
          <ul>
            {moreMenus.map((menu, index) => (
              <li key={index} className="p-2 text-center text-white">
                <Link to={menu.path} onClick={() => setShowMoreOptions(false)}>
                  <div className="flex flex-col items-center">
                    {menu.icon}
                    <span className="text-sm">{menu.title}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashSideBar;
