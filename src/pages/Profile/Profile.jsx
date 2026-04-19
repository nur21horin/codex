import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

import ProfileInfo from "./ProfileInfor";

const Profile = () => {
  const { user, loading } = useAuth();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [uploading, setUploading] = useState(false);
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");

  // ================= FETCH PROFILE =================
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const res = await fetch(
          `https://codesharebackend-1.onrender.com/users/${user?.email}`,
          {
            headers: {
              Authorization: `Bearer ${await user?.getIdToken()}`,
            },
          }
        );

        const data = await res.json();

        setProfile(data);
        setName(data?.name || "");
        setPhoto(data?.photoURL || "");
        setCoverPhoto(data?.coverPhoto || "");
        setBio(data?.bio || "");
        setSkills(data?.skills?.map((s) => s.name).join(", ") || "");

        // posts (MongoDB)
        const postRes = await fetch("https://codesharebackend-1.onrender.com/posts");
        const postData = await postRes.json();
        setPosts(postData.posts || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [user]);

  // ================= COVER UPLOAD =================
  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.success) throw new Error("Upload failed");

      const imageUrl = data.data.url;

      await fetch("https://codesharebackend-1.onrender.com/users/cover", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await user?.getIdToken()}`,
        },
        body: JSON.stringify({ coverPhoto: imageUrl }),
      });

      setCoverPhoto(imageUrl);

      Swal.fire("Success", "Cover photo updated!", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setUploading(false);
    }
  };

  // ================= UPDATE PROFILE =================
  const handleUpdate = async () => {
    const skillArray = skills
      .split(",")
      .map((s) => ({
        name: s.trim(),
        rating: 1200,
      }))
      .filter((s) => s.name);

    await fetch("https://codesharebackend-1.onrender.com/users/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await user?.getIdToken()}`,
      },
      body: JSON.stringify({
        bio,
        skills: skillArray,
      }),
    });

    setProfile((prev) => ({
      ...prev,
      bio,
      skills: skillArray,
    }));

    Swal.fire("Success", "Profile updated!", "success");
    setOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        No user found. Please login.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8 text-base-content">

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-base-100 rounded-2xl shadow-xl overflow-hidden"
      >

        {/* COVER */}
        <div className="h-44 md:h-64 relative">
          <img
            src={
              coverPhoto ||
              "https://images.unsplash.com/photo-1503264116251-35a269479413"
            }
            className="w-full h-full object-cover"
          />

          <label className="absolute top-4 right-4 btn btn-sm btn-primary">
            {uploading ? "Uploading..." : "Cover"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleCoverUpload}
            />
          </label>
        </div>

        {/* AVATAR */}
        <div className="absolute left-6 -bottom-12">
          <img
            src={
              photo ||
              user.photoURL ||
              "https://i.ibb.co/2s3zLZP/default-avatar.png"
            }
            className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-base-100 object-cover"
          />
        </div>

        {/* INFO */}
        <div className="p-6 pt-16 md:pt-20 flex justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {profile?.name || user.displayName}
            </h2>
            <p className="text-sm text-base-content/60">{user.email}</p>
          </div>

          <button onClick={() => setOpen(true)} className="btn btn-primary">
            Edit Profile
          </button>
        </div>
      </motion.div>

      {/* PROFILE INFO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <ProfileInfo profile={profile} />

        <div className="stats shadow bg-base-100 w-full">
          <div className="stat">
            <div className="stat-title">Followers</div>
            <div className="stat-value text-primary">
              {profile?.followers?.length || 0}
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Following</div>
            <div className="stat-value text-secondary">
              {profile?.following?.length || 0}
            </div>
          </div>
        </div>
      </div>

      {/* POSTS */}
      <div className="mt-8 card bg-base-100 shadow-md">
        <div className="card-body">
          <h3 className="text-lg font-semibold">My Posts</h3>

          {posts.length === 0 ? (
            <p className="text-base-content/60">No posts yet 😴</p>
          ) : (
            <div className="space-y-3 mt-3">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="p-3 rounded-lg border border-base-300"
                >
                  <p className="text-sm">{post.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <motion.div className="bg-base-100 w-full max-w-md rounded-xl p-6 space-y-4 shadow-xl">

              <h2 className="text-xl font-bold text-center">Edit Profile</h2>

              <textarea
                className="textarea textarea-bordered w-full"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio"
              />

              <input
                className="input input-bordered w-full"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="skills (comma separated)"
              />

              <div className="flex justify-end gap-2">
                <button className="btn" onClick={() => setOpen(false)}>
                  Cancel
                </button>

                <button className="btn btn-primary" onClick={handleUpdate}>
                  Save
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Profile;