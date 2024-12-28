import React from "react";
import ProfileImageLarge from "../../assets/ProfileImageLarge.png";

const CallToAction = () => {
  // Navigate to portfolio
  const handleNavigation = () => {
    window.open("https://mhlongolesego.netlify.app", "_blank");
  };

  return (
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-center  rounded-tl-3xl rounded-br-3xl border border-secondary px-2 pt-8">
      {/* Left Side Text */}
      <div className="text-center md:text-left max-w-lg">
        <h2 className="text-2xl font-bold mb-4">
          Got an Idea? Let’s Bring It to Life!
        </h2>
        <p className="text-lg mb-6">
          Share your thoughts and let’s collaborate to turn your vision into
          reality. Together, we can create something amazing!
        </p>
        <button className="button" onClick={handleNavigation}>
          Contact Me
        </button>
      </div>

      {/* Right Side Image */}
      <div className="mt-2 md:mt-0">
        <img
          src={ProfileImageLarge}
          alt="Profile"
          className="w-full max-w-sm mx-auto"
        />
      </div>
    </div>
  );
};

export default CallToAction;
