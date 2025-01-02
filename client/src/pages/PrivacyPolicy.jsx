import React from "react";
import { useSelector } from "react-redux";

const PrivacyPolicy = () => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <section
      className={`w-full py-16 ${
        theme === "light"
          ? "bg-white text-gray-800"
          : "bg-neutral-900 text-white"
      } `}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center">
          Privacy Policy
        </h1>

        {/* Introduction */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="text-lg leading-relaxed">
            At Less-Ego, we value your privacy and are committed to protecting
            your personal information. This Privacy Policy explains how we
            collect, use, and safeguard your data when you visit our website.
          </p>
        </div>

        {/* Information Collection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Personal Information:</strong> When you sign up for our
              newsletter, leave comments, or contact us, we may collect
              information such as your name, email address, and any additional
              details you provide.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect information about how you
              interact with our website, including IP addresses, browser types,
              and pages visited.
            </li>
            <li>
              <strong>Cookies:</strong> We use cookies to enhance your
              experience. These are small files stored on your device to help us
              analyze site traffic and performance.
            </li>
          </ul>
        </div>

        {/* Usage of Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            How We Use Your Information
          </h2>
          <p className="text-lg leading-relaxed">
            The information we collect is used for:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Improving website functionality and content.</li>
            <li>Sending newsletters and updates about our blog.</li>
            <li>Responding to inquiries and comments.</li>
            <li>Analyzing website traffic and user behavior.</li>
          </ul>
        </div>

        {/* Sharing of Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
          <p className="text-lg leading-relaxed">
            We do not sell or share your personal information with third
            parties, except:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>To comply with legal obligations.</li>
            <li>To protect and defend our rights or property.</li>
            <li>
              When you provide explicit consent to share your information.
            </li>
          </ul>
        </div>

        {/* Security */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Security</h2>
          <p className="text-lg leading-relaxed">
            We implement robust security measures to safeguard your data.
            However, no system is entirely secure, and we cannot guarantee the
            absolute security of your information.
          </p>
        </div>

        {/* Your Rights */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
          <p className="text-lg leading-relaxed">You have the right to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Access the personal information we hold about you.</li>
            <li>Request corrections or updates to your information.</li>
            <li>Withdraw consent for data collection at any time.</li>
          </ul>
        </div>

        {/* Changes to Policy */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
          <p className="text-lg leading-relaxed">
            We may update this Privacy Policy to reflect changes in our
            practices or for other operational, legal, or regulatory reasons.
            Please review this page periodically for updates.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg leading-relaxed">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at <strong>lesegomhlongo@gmail.com</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
