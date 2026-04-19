import React from "react";
import { useParams, Link } from "react-router-dom";

const faqData = {
  1: {
    question: "How do I create a post?",
    answer:
      "Go to home page, click 'What's on your mind?', fill the form and publish your post.",
  },
  2: {
    question: "How can I delete my post?",
    answer:
      "Open your post and click delete button. Only the owner of the post can delete it.",
  },
  3: {
    question: "Why is my post not showing?",
    answer:
      "Refresh the page or check your internet connection. If still not visible, try logging in again.",
  },
  4: {
    question: "How to contact support?",
    answer:
      "Go to the contact page and send a message. Our support team replies within 24 hours.",
  },
};

const FaqDetails = () => {
  const { id } = useParams();
  const faq = faqData[id];

  if (!faq) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <div className="bg-base-100 p-6 rounded-2xl shadow text-center border border-base-300">
          <h2 className="text-xl font-bold text-error">Question not found</h2>
          <Link to="/faq" className="btn btn-primary mt-4 w-full">
            Back to FAQ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10 transition-colors duration-300">

      <div className="max-w-xl w-full bg-base-100 shadow-xl rounded-2xl p-6 border border-base-300">

        {/* QUESTION */}
        <h1 className="text-2xl font-bold text-primary mb-4 flex items-start gap-2">
          ❓ {faq.question}
        </h1>

        {/* ANSWER */}
        <p className="text-base-content/70 leading-relaxed mb-6">
          {faq.answer}
        </p>

        {/* BACK BUTTON */}
        <Link
          to="/faq"
          className="btn btn-primary w-full hover:scale-[1.02] transition-transform"
        >
          ← Back to FAQ
        </Link>

      </div>
    </div>
  );
};

export default FaqDetails;