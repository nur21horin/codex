import { useEffect, useState } from "react";
import PostCard from "../Home/postCard";

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  const [tag, setTag] = useState("");
  const [dateSort, setDateSort] = useState("newest");
  const [sortBy, setSortBy] = useState("latest");

  const [loading, setLoading] = useState(false);

  
 useEffect(() => {
  const fetchPosts = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://codesharebackend-1.onrender.com/posts/explore?search=${search}&tag=${tag}&dateSort=${dateSort}&sortBy=${sortBy}`
      );

      const data = await res.json();

      setPosts(data.posts || []); 
    } catch (err) {
      console.log(err);
      setPosts([]); 
    }

    setLoading(false);
  };

  fetchPosts();
}, [search, tag, dateSort, sortBy]);

  return (
    <div className="p-4 space-y-4">

     
      <h1 className="text-2xl font-bold">Explore Posts</h1>

      <div className="grid gap-3 md:grid-cols-4">

        
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full"
        />

        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="">All Tags</option>
          <option value="react">React</option>
          <option value="node">Node</option>
          <option value="mern">MERN</option>
        </select>

       
        <select
          value={dateSort}
          onChange={(e) => setDateSort(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>

       
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="latest">Latest</option>
          <option value="popular">Most Popular</option>
        </select>

      </div>

     
      {loading && (
        <p className="text-center text-gray-500">Loading posts...</p>
      )}

      
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {/* EMPTY STATE */}
      {!loading && posts.length === 0 && (
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold">No posts found</h2>
          <p className="text-gray-500">
            Try changing filters or search keywords
          </p>
        </div>
      )}

    </div>
  );
};

export default Explore;