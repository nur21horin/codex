import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const [stats] = useState({
    users: 1200,
    posts: 5400,
  });

  // theme apply
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const social = [
    { icon: "🐙", label: "GitHub" },
    { icon: "💼", label: "LinkedIn" },
    { icon: "🌐", label: "Website" },
  ];

  return (
    <footer className="mt-12 bg-bg text-text border-t border-muted">

      <div className="bg-card border border-muted">

        <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold text-primary">
              CP Platform
            </h2>

            <p className="mt-3 text-sm text-muted leading-relaxed">
              A competitive programming community where developers share
              optimized solutions, learn algorithms, and grow together.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-4 mt-5 text-xl">
              {social.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2, rotate: 8 }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer text-muted hover:text-primary transition"
                  title={item.label}
                >
                  {item.icon}
                </motion.div>
              ))}
            </div>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="font-semibold mb-3 text-text">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm text-muted">
              <li><Link className="hover:text-primary" to="/">Home</Link></li>
              <li><Link className="hover:text-primary" to="/createpost">Create</Link></li>
              <li><Link className="hover:text-primary" to="/profile">Profile</Link></li>
              <li><Link className="hover:text-primary" to="/about">About</Link></li>
            </ul>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-5">

            {/* THEME */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-text">Theme</span>

              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.9 }}
                className="px-4 py-2 rounded-full bg-bg border border-muted text-text hover:bg-card transition"
              >
                {theme === "light" ? "🌙 Dark" : "☀️ Light"}
              </motion.button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-3 text-center">

              <div className="p-3 rounded-xl bg-bg border border-muted">
                <p className="text-lg font-bold text-primary">
                  {stats.users}+
                </p>
                <p className="text-xs text-muted">Users</p>
              </div>

              <div className="p-3 rounded-xl bg-bg border border-muted">
                <p className="text-lg font-bold text-primary">
                  {stats.posts}+
                </p>
                <p className="text-xs text-muted">Posts</p>
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-muted text-center py-4 text-sm text-muted">
          © {new Date().getFullYear()} CP Platform — Built for competitive programmers ⚡
        </div>

      </div>
    </footer>
  );
};

export default Footer;