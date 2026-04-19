import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`https://codesharebackend-1.onrender.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-text">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // NOT FOUND
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-text">
        <p className="text-red-500 font-semibold">Post not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text px-4 py-10">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-card border border-muted rounded-2xl shadow-lg overflow-hidden"
      >

        {/* IMAGE */}
        <div className="overflow-hidden">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            src={post.image || "https://i.ibb.co/2kR6z6n/user.png"}
            className="w-full h-52 md:h-72 object-cover hover:scale-105 transition duration-500"
          />
        </div>

        <div className="p-6 space-y-5">

          {/* TITLE */}
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {post.problem_name}
          </h1>

          {/* META */}
          <div className="flex flex-wrap gap-2 text-sm text-muted">
            <span>👤 {post.user_name}</span>
            <span>•</span>
            <span>{new Date(post.created_at).toLocaleString()}</span>
          </div>

          {/* DESCRIPTION */}
          <p className="text-base leading-relaxed text-text/80">
            {post.description}
          </p>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs border border-primary text-primary hover:bg-primary hover:text-white transition"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* DETAILS */}
          <div className="bg-bg border border-muted rounded-xl p-4">
            <h2 className="font-semibold text-secondary mb-2">
              📌 Details
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              This solution is shared for learning competitive programming
              techniques, optimization strategies, and algorithmic thinking.
            </p>
          </div>

          {/* RELATED */}
          <div>
            <h2 className="font-semibold text-lg text-accent mb-3">
              🔗 Related Posts
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {[1, 2].map((_, i) => (
                <div
                  key={i}
                  className="h-24 bg-bg border border-muted rounded-xl animate-pulse"
                />
              ))}
            </div>
          </div>

        </div>
      </motion.div>

      {/* FOOTER */}
      <div className="text-center text-sm text-muted mt-6">
        Built for competitive programmers ⚡
      </div>

    </div>
  );
};

export default PostDetails;