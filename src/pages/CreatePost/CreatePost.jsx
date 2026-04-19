import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import imageCompression from "browser-image-compression";
import { Upload } from "lucide-react";

const CreatePost = () => {
  const { user, loading } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [dragActive, setDragActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [loadingPost, setLoadingPost] = useState(false);

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-text">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  
  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    try {
      return await imageCompression(file, options);
    } catch {
      return file;
    }
  };

  const handleFile = async (file) => {
    if (!file) return;

    const compressed = await compressImage(file);

    setImage(compressed);
    setPreview(URL.createObjectURL(compressed));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const uploadImageToImageBB = async (file) => {
    if (!file) return "";

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return Swal.fire("Error", "Please login first", "error");
    }

    try {
      setLoadingPost(true);

      let imageUrl = "";
      if (image) {
        imageUrl = await uploadImageToImageBB(image);
      }

      const postData = {
        problem_name: title,
        description,
        image: imageUrl,
        tags: tags.split(",").map((t) => t.trim()),
      };

      const res = await fetch(
        "https://codesharebackend-1.onrender.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await user.getIdToken()}`,
          },
          body: JSON.stringify(postData),
        }
      );

      const result = await res.json();

      if (result.insertedId) {
        Swal.fire("Success 🚀", "Post created successfully!", "success");

        setTitle("");
        setDescription("");
        setTags("");
        setImage(null);
        setPreview(null);

        navigate("/");
      } else {
        Swal.fire("Error", "Failed to create post", "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoadingPost(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text flex items-center justify-center px-4 py-10">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-card border border-muted shadow-lg rounded-2xl p-6 space-y-5"
      >
        <h1 className="text-2xl font-bold text-center text-primary">
          Create CP Solution Post 🚀
        </h1>

        <input
          className="w-full px-3 py-2 rounded-lg bg-bg border border-muted text-text"
          placeholder="Problem Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full px-3 py-2 rounded-lg bg-bg border border-muted text-text h-32"
          placeholder="Explain your solution..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="w-full px-3 py-2 rounded-lg bg-bg border border-muted text-text"
          placeholder="Tags (dp, graph, greedy)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

      
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`w-full border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition
          ${dragActive ? "border-primary bg-card" : "border-muted bg-bg"}`}
        >

          <Upload className="mx-auto w-6 h-6 text-muted mb-2" />

          <p className="text-sm text-muted">
            Drag & drop image here or click to upload
          </p>

          <input
            type="file"
            accept="image/*"
            id="fileUpload"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />

          <label
            htmlFor="fileUpload"
            className="inline-block mt-3 px-4 py-2 bg-primary text-white rounded-lg cursor-pointer"
          >
            Choose File
          </label>
        </div>

        {/* FILE INFO */}
        {image && (
          <p className="text-sm text-muted">📁 {image.name}</p>
        )}

        {/* PREVIEW */}
        {preview && (
          <img
            src={preview}
            onClick={() => setModalOpen(true)}
            className="w-full h-40 object-cover rounded-lg border border-muted cursor-pointer"
          />
        )}

        {/* MODAL */}
        {modalOpen && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setModalOpen(false)}
          >
            <img
              src={preview}
              className="max-w-3xl max-h-[80vh] rounded-lg"
            />
          </div>
        )}

        {/* TIP */}
        <div className="p-4 rounded-xl bg-bg border border-muted text-sm text-muted">
          💡 Tip: Add clear explanation and optimized approach.
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={loadingPost}
          className="w-full bg-primary text-white py-2 rounded-lg"
        >
          {loadingPost ? "Publishing..." : "Publish Post"}
        </button>

      </motion.div>
    </div>
  );
};

export default CreatePost;