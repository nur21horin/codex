import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ThemeToggle from "../../Theme/ThemeToggle";


const Navbar = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-card/80 border-b border-muted shadow-sm">

      <div className="flex justify-between items-center px-4 py-3">

        {/* LOGO */}
        <Link to="/" className="text-xl font-bold text-primary">
          CodeShare
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 items-center text-sm text-text">

          <Link className="hover:text-primary transition" to="/">Home</Link>
          <Link className="hover:text-primary transition" to="/createpost">Create</Link>
          <Link className="hover:text-primary transition" to="/about">About</Link>
          <Link className="hover:text-primary transition" to="/help">Help</Link>
          <Link className="hover:text-primary transition" to="/contact">Contact</Link>
          {user ? (
            <Link onClick={() => setOpen(false)} to="/profile">Profile</Link>
          ) : (
            <Link onClick={() => setOpen(false)} to="/login">Login</Link>
          )}

          <ThemeToggle />

          {/* USER */}
          <div className="ml-2 px-3 py-1 rounded-full bg-secondary text-white text-xs">
            {user ? user.displayName : "Guest"}
          </div>
          {user ? (
              <div className="ml-2 px-3 py-1 rounded-full bg-secondary text-white text-xs">
                <Link onClick={() => setOpen(false)} to="/logout">Logout</Link>
              </div>
            ) : (
              <Link className="ml-2 px-3 py-1 rounded-full bg-secondary text-white text-xs" to="/login">Login</Link>
            )}

        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl text-text"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm bg-card border-t border-muted">

          <Link onClick={() => setOpen(false)} to="/">Home</Link>
          <Link onClick={() => setOpen(false)} to="/createpost">Create</Link>
          <Link onClick={() => setOpen(false)} to="/about">About</Link>
          <Link onClick={() => setOpen(false)} to="/help">Help</Link>
          <Link onClick={() => setOpen(false)} to="/contact">Contact</Link>
          {user ? (
            <Link onClick={() => setOpen(false)} to="/profile">Profile</Link>
          ) : (
            <Link onClick={() => setOpen(false)} to="/login">Login</Link>
          )}
          
          <div className="pt-2 flex justify-between items-center">
            <ThemeToggle />

            <span className="text-xs text-muted">
              {user ? user.email  : "Not logged in"}

            </span>
            {user && (
              <div className="ml-2 px-3 py-1 rounded-full bg-secondary text-white text-xs">
                <Link onClick={() => setOpen(false)} to="/logout">Logout</Link>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};

export default Navbar;