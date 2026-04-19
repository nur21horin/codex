import React from "react";
import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div className="min-h-screen bg-bg text-text flex items-center justify-center px-4">

      <div className="max-w-2xl w-full bg-card border border-muted shadow-lg rounded-2xl p-6 space-y-5">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center text-primary">
          Help & Support
        </h1>

        <p className="text-center text-muted">
          We’re here to help you anytime 🚀
        </p>

        {/* FAQ */}
        <Link to="/faq">
          <div className="p-4 rounded-xl border border-muted bg-bg hover:bg-card transition cursor-pointer">
            <h2 className="font-semibold text-text">
              ❓ Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted mt-1">
              Explore common questions, solutions, and platform guides.
            </p>
          </div>
        </Link>

        {/* QUICK SUPPORT */}
        <div className="p-4 rounded-xl border border-muted bg-bg hover:bg-card transition">
          <h2 className="font-semibold text-text">
            ⚡ Quick Support
          </h2>
          <p className="text-sm text-muted mt-1">
            Our team is ready to help you with technical or account issues.
          </p>
        </div>

        {/* CONTACT */}
        <div className="p-4 rounded-xl border border-muted bg-bg hover:bg-card transition">
          <h2 className="font-semibold text-text">
            📧 Contact Support
          </h2>
          <p className="text-sm text-muted mt-1">
            Send a message and we will respond within 24 hours.
          </p>
        </div>

        {/* BUTTON */}
        <div className="text-center pt-2">
          <Link
            to="/contact"
            className="inline-block px-6 py-2 rounded-full bg-primary text-white hover:opacity-90 transition"
          >
            Go to Contact Page
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Help;