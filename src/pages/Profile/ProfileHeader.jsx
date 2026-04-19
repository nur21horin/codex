import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/Firebase.init";
import Swal from "sweetalert2";

const ProfileHeader = ({ user, profile }) => {
  const [coverPhoto, setCoverPhoto] = useState(profile?.coverPhoto || "");
  const [uploading, setUploading] = useState(false);

  // ================= COVER UPLOAD =================
 const handleCoverUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    setUploading(true);

    // 1. upload to imgbb
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    const imageUrl = data.data.url;

    // 2. save to MongoDB
    await fetch("https://codesharebackend-1.onrender.com/users/cover", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await user.getIdToken()}`,
      },
      body: JSON.stringify({ coverPhoto: imageUrl }),
    });

    // 3. update UI state ONLY
    setCoverPhoto(imageUrl);

    Swal.fire("Success", "Cover updated!", "success");
  } catch (err) {
    Swal.fire("Error", err.message, "error");
  } finally {
    setUploading(false);
  }
};

  return (
    <div className="relative bg-base-100 rounded-2xl shadow-xl overflow-hidden">

      {/* COVER IMAGE */}
      <div className="h-44 md:h-64 relative">
        <img
          src={
            coverPhoto ||
            "https://images.unsplash.com/photo-1503264116251-35a269479413"
          }
          className="w-full h-full object-cover"
        />

        {/* UPLOAD BUTTON */}
        <label className="absolute top-4 right-4 btn btn-sm btn-primary">
          {uploading ? "Uploading..." : "Change Cover"}
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
            profile?.photoURL ||
            user.photoURL ||
            "https://i.ibb.co/2s3zLZP/default-avatar.png"
          }
          className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-base-100 object-cover"
        />
      </div>

      {/* USER INFO */}
      <div className="p-6 pt-16 md:pt-20 flex flex-col md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            {profile?.displayName || user.displayName}
          </h2>
          <p className="text-sm text-base-content/60">{user.email}</p>
        </div>

      </div>

    </div>
  );
};

export default ProfileHeader;