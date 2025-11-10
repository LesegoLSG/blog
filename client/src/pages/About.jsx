import React, { useState } from "react";
import { FaLightbulb, FaUsers, FaCode, FaRocket } from "react-icons/fa";
import DarkBannerImage from "../assets/HomePageImage/DarkBannerImage.png";
import Team from "../assets/AboutImages/Team.jpg";
import ProfileImageLarge from "../assets/ProfileImageLarge.png";
import { useSelector } from "react-redux";
import Popup from "../components/Reusables/PopUp";

const AboutUs = () => {
  const { theme } = useSelector((state) => state.theme);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");

  // Open pop up
  const handleButtonClick = (title, message) => {
    setPopupTitle(title);
    setPopupMessage(message);
    setPopupOpen(true);
  };

  // Close pop up
  const closePopup = () => setPopupOpen(false);

  return (
    <section
      className={`w-full py-16 pt-[8rem] ${
        theme === "light"
          ? "bg-white text-gray-800"
          : "bg-neutral-900 text-white"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Story Section */}
        <div className="relative py-24">
          <div className="absolute inset-0 z-0 overflow-hidden border  border-accent rounded-lg p-1">
            <img
              src={DarkBannerImage}
              alt="My Story"
              className="w-full h-full object-cover opacity-60 rounded-lg"
            />
          </div>
          <div className="relative z-10 text-center text-white px-1.5 md:p-0">
            <h2 className="text-4xl font-extrabold mb-4">How I Got Started</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              My passion for technology began with a simple goal: to create
              solutions that make life easier. Over the years, I have honed my
              skills in development, design, and problem-solving, which have
              allowed me to build impactful projects and continue growing in the
              ever-evolving tech landscape.
            </p>
          </div>
        </div>

        {/* About me Section */}
        <div className="flex flex-col-reverse md:flex-row gap-16 py-24">
          <div className="flex-1 px-1.5 md:px-0">
            <h3 className="text-3xl font-extrabold  mb-4">Meet Me</h3>
            <p className="text-lg  mb-6">
              I am a passionate developer with a keen interest in creating
              innovative solutions. My expertise spans various areas of
              technology, and I am constantly striving to expand my knowledge
              and contribute meaningfully to the tech community.
            </p>
            <div className="flex items-center gap-8">
              <div className="flex items-center">
                <FaUsers className="text-4xl text-secondary mr-3" />
                <p className="text-xl font-semibold">Tech Enthusiast</p>
              </div>
              <div className="flex items-center">
                <FaCode className="text-4xl text-secondary mr-3" />
                <p className="text-xl font-semibold">Problem Solver</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center border border-accent p-1 rounded-lg">
            <img
              src={ProfileImageLarge}
              alt="Personal Image"
              className="w-1/2 h-auto object-fit rounded-lg"
            />
          </div>
        </div>

        {/* Conflict Section */}
        <div
          className={`${
            theme === "light" ? "bg-gray-100" : "bg-neutral-800 text-white"
          } text-gray-700 py-24 relative`}
        >
          <div className="relative z-10 text-center px-1.5 md:px-0">
            <h2 className="text-4xl font-extrabold mb-4">The Challenge</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Staying updated with the fast-paced world of tech can be
              overwhelming. Developers often struggle to find reliable and
              digestible content that covers the most recent trends and
              innovations. I understood this struggle and set out to create a
              space that addresses these gaps.
            </p>
            <div className="flex justify-center gap-6">
              <button
                className="button"
                onClick={() =>
                  handleButtonClick(
                    "Feature Maintainance",
                    "Thank you for your interest! We're working on enhancing this feature.Once ready, you'll be able to participate in insightful discussions with developers worldwide, sharing ideas and building connections.."
                  )
                }
              >
                Join the Conversation
              </button>
            </div>
          </div>
        </div>

        {/* Resolution Section */}
        <div className="relative py-24">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={DarkBannerImage}
              alt="Resolution"
              className="w-full h-full object-cover opacity-60"
            />
          </div>
          <div className="relative z-10 text-center text-white px-1.5 md:px-0">
            <h2 className="text-4xl font-extrabold mb-4">My Solution</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              In this blog i deliver high-quality, accessible content that helps
              developers stay ahead of industry changes. From detailed tutorials
              to industry insights, I provide content that is actionable,
              inspiring, and informative. My mission is to empower developers to
              not only keep up but to lead in the tech world.
            </p>
            <div className="flex justify-center gap-6">
              <button
                className="button"
                onClick={() =>
                  handleButtonClick(
                    "Feature Maintainance",
                    "Our content is still under maintenance. Soon, you'll have access to detailed tutorials, industry insights, and actionable tips to empower your development journey."
                  )
                }
              >
                Discover Our Content
              </button>
            </div>
          </div>
        </div>

        {/* The Sequel Section */}
        <div
          className={`${
            theme === "light" ? "bg-gray-100" : "bg-neutral-800 text-white"
          } py-24`}
        >
          <div className="text-center px-1.5 md:px-0">
            <h2 className="text-4xl font-extrabold mb-4">What’s Next for Me</h2>
            <p className="text-lg  max-w-3xl mx-auto mb-8">
              My journey is ongoing. I’m committed to learning, collaborating,
              and building projects that make a difference. The future holds
              exciting possibilities, and I am eager to embrace them.
            </p>
            <div className="flex justify-center gap-6">
              <button
                className="button"
                onClick={() =>
                  handleButtonClick(
                    "Feature Maintainance",
                    "Our mailing list sign-up is under maintenance. Once operational, you’ll receive exclusive insights, the latest tech trends, and updates directly in your inbox."
                  )
                }
              >
                Join Our Mailing List
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Popup Component */}
      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        title={popupTitle}
        message={popupMessage}
      />
    </section>
  );
};

export default AboutUs;
