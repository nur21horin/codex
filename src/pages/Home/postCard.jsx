import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post?.likes?.length || 0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `https://codesharebackend-1.onrender.com/comments/${post._id}`
      );
      const data = await res.json();
      setComments(Array.isArray(data) ? data : []);
    } catch {
      setComments([]);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post._id]);

  useEffect(() => {
    const interval = setInterval(fetchComments, 5000);
    return () => clearInterval(interval);
  }, [post._id]);

  const handleLike = async () => {
    try {
      const res = await fetch(
        `https://codesharebackend-1.onrender.com/posts/like/${post._id}`,
        { method: "PATCH" }
      );
      const result = await res.json();

      if (result.message === "Liked") setLikes((p) => p + 1);
      if (result.message === "Unliked") setLikes((p) => Math.max(p - 1, 0));
    } catch {}
  };

  const handleComment = async () => {
    if (!commentText) return;

    try {
      await fetch("https://codesharebackend-1.onrender.com/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await user?.getIdToken()}`,
        },
        body: JSON.stringify({
          post_id: post._id,
          text: commentText,
        }),
      });

      setComments((prev) => [
        {
          _id: Date.now(),
          text: commentText,
          user_email: user?.email,
          created_at: new Date(),
        },
        ...prev,
      ]);

      setCommentText("");
    } catch {}
  };

  return (
    <div className="bg-card border border-muted rounded-2xl shadow-md overflow-hidden flex flex-col h-[520px] hover:scale-[1.02] transition">

      {/* IMAGE */}
      <img
        src={post.image || "https://i.ibb.co/2kR6z6n/user.png"}
        className="w-full h-40 object-cover"
      />

      <div className="p-4 flex flex-col flex-grow space-y-3">

        {/* USER */}
        <div className="flex items-center gap-3">
          <img
            src={post.user_photo || "https://i.ibb.co/2kR6z6n/user.png"}
            className="w-9 h-9 rounded-full border border-muted"
          />
          <div>
            <h3 className="text-sm font-semibold text-text">
              {post.user_name}
            </h3>
            <p className="text-xs text-muted">
              {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* TITLE */}
        <h2 className="font-bold text-lg text-primary line-clamp-1">
          {post.problem_name}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-sm text-muted line-clamp-2">
          {post.description}
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2">
          {post.tags?.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* META */}
        <div className="text-xs text-muted">
          👍 {likes} Likes • 💬 {comments.length} Comments
        </div>

        {/* ACTIONS */}
        <div className="mt-auto space-y-2">

          {/* LIKE + COMMENT INPUT */}
          <div className="flex gap-2 items-center">

            <button
              onClick={handleLike}
              className="px-3 py-1 text-xs rounded-lg border border-muted bg-bg text-text hover:bg-primary hover:text-white transition"
            >
              👍 Like
            </button>

            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Comment..."
              className="flex-1 px-2 py-1 text-xs rounded-lg bg-bg border border-muted text-text placeholder:text-muted focus:outline-none"
            />

            <button
              onClick={handleComment}
              className="px-3 py-1 text-xs rounded-lg bg-primary text-white hover:opacity-90 transition"
            >
              Post
            </button>

          </div>

          {/* DETAILS BUTTON */}
          <Link to={`/post/${post._id}`}>
            <button className="w-full px-3 py-2 text-sm rounded-lg bg-accent text-white hover:opacity-90 transition">
              View Details
            </button>
          </Link>

        </div>

      </div>
    </div>
  );
};

export default PostCard;