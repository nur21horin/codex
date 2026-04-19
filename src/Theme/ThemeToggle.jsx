import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  // SYSTEM THEME AUTO DETECT
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggle = () => {
    const html = document.documentElement;

    if (dark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDark(!dark);
  };

  return (
    <button
      onClick={toggle}
      className="relative w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300"
      style={{
        background: dark ? "#7c3aed" : "#d1d5db",
      }}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          dark ? "translate-x-7" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;