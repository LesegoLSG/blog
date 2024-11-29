import React, { useState, useEffect } from "react";
import { AiFillCaretUp } from "react-icons/ai";

const TopScrollerButton = () => {
  const [backToTop, setBackToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });
  }, [backToTop]);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {backToTop && (
        <button
          style={{
            position: "fixed",
            bottom: "80px",
            right: "5px",
            height: "30px",
            width: "30px",
            fontSize: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "#008DDA",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            zIndex: "9999",
            padding: "5px",
          }}
          onClick={scrollUp}
        >
          <AiFillCaretUp size={30} />
        </button>
      )}
    </div>
  );
};

export default TopScrollerButton;
