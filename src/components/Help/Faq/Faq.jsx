import React from "react";
import { Link } from "react-router-dom";

const Faq = () => {
  const questions = [
    { id: 1, title: "How do I create a post?" },
    { id: 2, title: "How can I delete my post?" },
    { id: 3, title: "Why is my post not showing?" },
    { id: 4, title: "How to contact support?" },
  ];

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10 transition-colors duration-300">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center text-primary mb-8">
        Frequently Asked Questions
      </h1>

      {/* FAQ LIST */}
      <div className="max-w-2xl mx-auto space-y-4">

        {questions.map((q) => (
          <Link key={q.id} to={`/faq/${q.id}`}>
            <div className="group bg-base-100 border border-base-300 rounded-xl p-4 shadow-sm hover:shadow-md hover:bg-base-300 transition-all duration-300 cursor-pointer">

              <div className="flex items-center gap-2">
                <span className="text-primary">❓</span>

                <p className="font-medium text-base-content group-hover:text-primary transition">
                  {q.title}
                </p>
              </div>

              <p className="text-xs text-base-content/60 mt-1 ml-6">
                Click to view detailed answer →
              </p>

            </div>
          </Link>
        ))}

      </div>

    </div>
  );
};

export default Faq;