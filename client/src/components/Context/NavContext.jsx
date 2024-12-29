import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const NavContext = createContext();

export const NavigationProvider = ({ children }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    // Map the current pathname to the corresponding active link
    const pathToActiveLink = {
      "/": "home",
      "/about": "about",
      "/search": "search",
    };

    // Set activeLink based on the current pathname
    setActiveLink(pathToActiveLink[location.pathname] || "");
  }, [location]);

  return (
    <NavContext.Provider value={{ activeLink, setActiveLink }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNavigates = () => useContext(NavContext);
