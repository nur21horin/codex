import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PostCard from "./postCard";
import CreatePostBox from "./createPostBox";
import CardSkeleton from "../../components/CardSekelton/CardSkeleton";
import { motion } from "framer-motion";

const Home = () => {
  const axiosSecure = useAxiosSecure();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [notFound, setNotFound] = useState(false);

  const [sortBy, setSortBy] = useState("newest");
  const [tag, setTag] = useState("");
  const [dateSort, setDateSort] = useState("");

  // debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  // fetch
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          page,
          limit: 8,
          search: debouncedSearch,
          sortBy,
          tag,
          dateSort,
        });

        const res = await fetch(
          `https://codesharebackend-1.onrender.com/posts?${query.toString()}`
        );

        const data = await res.json();

        const safePosts = Array.isArray(data.posts) ? data.posts : [];

        setPosts(safePosts);
        setTotalPages(data.totalPages || 1);
        setNotFound(safePosts.length === 0);
      } catch (err) {
        console.log(err);
        setPosts([]);
        setNotFound(true);
      }

      setLoading(false);
    };

    fetchPosts();
  }, [page, debouncedSearch, sortBy, tag, dateSort]);

  if (loading) return <CardSkeleton />;

  return (
    <div className="min-h-screen bg-bg text-text px-4 py-6">

      {/* SEARCH */}
      <div className="mb-4">
        <CreatePostBox
          search={search}
          setSearch={(value) => {
            setPage(1);
            setSearch(value);
          }}
          setPage={setPage}
          loading={loading}
        />
      </div>

      {/* SORT */}
      <div className="mb-6">
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPage(1);
          }}
          className="w-full bg-card border border-muted text-text rounded-lg px-3 py-2 focus:outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="popular">Most Popular</option>
          <option value="trending">Trending</option>
        </select>
      </div>

      {/* EMPTY */}
      {notFound && !loading && (
        <div className="text-center py-12 text-muted">
          🔍 No posts found
        </div>
      )}

      {/* POSTS */}
      {!notFound && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {posts.map((post) => (
            <motion.div
              key={post._id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-card border border-muted rounded-xl p-3 hover:shadow-md transition"
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center mt-8 gap-2 flex-wrap">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 rounded-lg border border-muted bg-card text-text disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`px-3 py-1 rounded-lg border ${
              page === num + 1
                ? "bg-primary text-white border-primary"
                : "border-muted bg-card text-text"
            }`}
          >
            {num + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 rounded-lg border border-muted bg-card text-text disabled:opacity-50"
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Home;