import React from "react";
import { useSelector } from "react-redux";

const TermsAndConditions = () => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div
      className={`min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 ${
        theme === "light"
          ? "bg-white text-gray-800"
          : "bg-neutral-900 text-white"
      }`}
    >
      <div className="max-w-4xl mx-auto  p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p className="">
            By accessing and using this blog, you agree to be bound by these
            terms and conditions. If you do not agree, please do not use our
            website.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold  mb-2">
            2. Intellectual Property
          </h2>
          <p className="">
            All content on this blog, including text, images, and logos, is the
            property of our blog or its content creators and is protected by
            copyright laws. Unauthorized use is prohibited.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. User Conduct</h2>
          <p className="">
            You agree to use this blog only for lawful purposes and not to
            engage in any behavior that could harm our site, its users, or our
            reputation.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold  mb-2">
            4. Limitation of Liability
          </h2>
          <p className="">
            We are not liable for any damages resulting from the use or
            inability to use our blog. All content is provided "as is" without
            warranties of any kind.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold  mb-2">5. Changes to Terms</h2>
          <p className="">
            We reserve the right to modify these terms and conditions at any
            time. Continued use of our blog after changes are made constitutes
            acceptance of the new terms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Governing Law</h2>
          <p className="">
            These terms are governed by the laws of your country or state. Any
            disputes will be handled exclusively in the relevant courts.
          </p>
        </section>

        <footer className="mt-8 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </footer>
      </div>
    </div>
  );
};

export default TermsAndConditions;
