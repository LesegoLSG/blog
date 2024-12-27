import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-8">
      <div className="max-w-screen-2xl mx-auto px-4 xl:px-28">
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Navigation Links */}
          <div className="mb-8 lg:mb-0">
            <h4 className="text-lg font-bold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                  Get in Touch
                </a>
              </li>
              <li>
                <a href="#product" className="hover:underline">
                  Product
                </a>
              </li>
            </ul>
          </div>
          {/* Terms and Conditions, Documentation, Privacy Policy */}
          <div className="mb-8 lg:mb-0">
            <h4 className="text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#terms" className="hover:underline">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#documentation" className="hover:underline">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          {/* Subscription Form */}
          <div className="w-full lg:w-1/3">
            <h4 className="text-lg font-bold mb-4">
              Subscribe to our newsletter
            </h4>
            <form className="flex flex-col sm:flex-row items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 mb-4 sm:mb-0 sm:mr-2 rounded border border-gray-300 text-gray-800"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>
            &copy; {new Date().getFullYear()} Less-Ego. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
