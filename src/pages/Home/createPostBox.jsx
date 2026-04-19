import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { Search, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const CreatePostBox = ({ search, setSearch, setPage, loading }) => {
  const { user } = useAuth();
  const [showClear, setShowClear] = useState(false);

  useEffect(() => {
    setShowClear(search.length > 0);
  }, [search]);

  return (
    <div className="sticky top-0 z-50 bg-card  rounded-xl p-4 shadow-md space-y-4">

      {/* SEARCH BOX */}
      <div className="relative w-full">

        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />

        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full bg-bg border border-muted text-text placeholder:text-muted rounded-lg pl-10 pr-10 py-2 focus:outline-none"
        />

        {/* LOADING */}
        {loading && (
          <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-primary" />
        )}

        {/* CLEAR */}
        {showClear && !loading && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="w-4 h-4 text-muted hover:text-red-500 transition" />
          </button>
        )}
      </div>

      {/* USER + CREATE POST */}
      <div className="flex items-center justify-between flex-wrap gap-3">

        {/* USER INFO */}
        <div className="flex items-center gap-3">
          <img
            src={
              user?.photoURL ||
              "https://ui-avatars.com/api/?name=User&background=random&color=fff"
            }
            className="w-10 h-10 rounded-full border border-muted object-cover"
            alt="user"
          />

          <span className="text-sm font-medium text-text">
            {user?.displayName || "Anonymous"}
          </span>
        </div>

        {/* CREATE BUTTON */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/createpost"
            className="bg-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition"
          >
            What's on your mind?
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default CreatePostBox;