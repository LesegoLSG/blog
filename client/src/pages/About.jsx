import React from "react";
import { FaLightbulb, FaUsers, FaCode, FaRocket } from "react-icons/fa"; // Icons for sections
import BannerImage from "../assets/HomePageImage/BannerImage.jpg"; // Placeholder image
import { useSelector } from "react-redux";

const AboutUs = () => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <section
      className={`w-full py-16 ${
        theme === "light"
          ? "bg-white text-gray-600"
          : "bg-neutral-900 text-white"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Story Section */}
        <div className="relative py-24">
          <div className="absolute inset-0 z-0 overflow-hidden border border-accent rounded-lg p-1">
            <img
              src={BannerImage}
              alt="Our Story"
              className="w-full h-full object-cover opacity-30 rounded-lg"
            />
          </div>
          <div className="relative z-10 text-center text-white">
            <h2 className="text-4xl font-extrabold mb-4">How We Got Started</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              We started with one simple goal: to provide tech professionals
              with a place to stay updated and inspired. Our journey began with
              a small group of developers, each bringing their unique skills to
              create a dynamic platform. The result is a blog that serves as a
              bridge between the latest trends in programming and the growing
              community of developers.
            </p>
            <div className="flex justify-center gap-x-6">
              <button className="button-alt">Join Our Community</button>
              <button className="button">Learn More</button>
            </div>
          </div>
        </div>

        {/* People Section */}
        <div className="flex flex-col-reverse md:flex-row gap-16 py-24">
          <div className="flex-1">
            <h3 className="text-3xl font-extrabold text-accent  mb-4">
              Meet the Team
            </h3>
            <p className="text-lg  mb-6">
              We are a diverse team of developers, designers, and content
              creators passionate about making complex tech topics accessible.
              Together, we bring a wide range of experiences to create content
              that speaks to developers of all levels.
            </p>
            <div className="flex items-center gap-8">
              <div className="flex items-center">
                <FaUsers className="text-4xl text-blue-600 mr-3" />
                <p className="text-xl font-semibold">Community Driven</p>
              </div>
              <div className="flex items-center">
                <FaCode className="text-4xl text-blue-600 mr-3" />
                <p className="text-xl font-semibold">Tech Experts</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <img
              src={BannerImage}
              alt="Tech Team"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Conflict Section */}
        <div className="bg-gray-900 text-white py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-50"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-extrabold mb-4">The Challenge</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Staying updated with the fast-paced world of tech can be
              overwhelming. Developers often struggle to find reliable and
              digestible content that covers the most recent trends and
              innovations. We understood this struggle and set out to create a
              space that addresses these gaps.
            </p>
            <div className="flex justify-center gap-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg">
                Join the Conversation
              </button>
            </div>
          </div>
        </div>

        {/* Resolution Section */}
        <div className="relative py-24">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={BannerImage}
              alt="Resolution"
              className="w-full h-full object-cover opacity-40"
            />
          </div>
          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-extrabold mb-4">Our Solution</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              We deliver high-quality, accessible content that helps developers
              stay ahead of industry changes. From detailed tutorials to
              industry insights, we provide content that is actionable,
              inspiring, and informative. Our mission is to empower developers
              to not only keep up but to lead in the tech world.
            </p>
            <div className="flex justify-center gap-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg">
                Discover Our Content
              </button>
            </div>
          </div>
        </div>

        {/* The Sequel Section */}
        <div className="bg-gray-100 py-24">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              What’s Next for Us
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
              Our journey is far from over. We’re continuously evolving,
              collaborating with industry leaders, and planning new initiatives
              to foster a thriving community of tech professionals. Stay tuned
              for upcoming projects, events, and opportunities.
            </p>
            <div className="flex justify-center gap-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg">
                Join Our Mailing List
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-12">
          <p className="text-sm text-gray-500">
            © 2024 Your Blog Name - All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
