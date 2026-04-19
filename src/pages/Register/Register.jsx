import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { auth, db } from "../../Firebase/Firebase.init";
import Swal from "sweetalert2";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.data.url;
};

 const handleRegister = async (data) => {
  try {
    // 1. Upload image
    const imageFile = data.photo[0];
    const imageUrl = await uploadImage(imageFile);

    // 2. Create user
    const result = await registerUser(data.email, data.password);

    // 3. Update profile
    if (auth.currentUser) {
      await updateUserProfile({
        displayName: data.name,
        photoURL: imageUrl,
      });
      await setDoc(doc(db, "users", result.user.uid), {
  uid: result.user.uid,
  name: data.name,
  email: data.email,
  photoURL: imageUrl || "",
  bio: "",
  skills: ["React"],
  followers: 0,
  following: 0,
  createdAt: new Date(),
});
    }

    // 4. Success alert
    Swal.fire({
      title: "Success!",
      text: "Registration completed successfully 🎉",
      icon: "success",
      confirmButtonText: "OK",
    });

    // 5. Redirect
    navigate(location?.state || "/");

  } catch (error) {
    console.log(error);

    Swal.fire({
      title: "Error!",
      text: error.message,
      icon: "error",
    });
  }
};

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl mt-10">
      <h3 className="text-3xl text-center font-semibold mt-4">
        Create Account
      </h3>
      <p className="text-center mb-2 text-gray-600">
        Register to get started
      </p>

      <form className="card-body" onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="space-y-3">

          {/* Name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Your Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}

          {/* Photo */}
          <label className="label">Profile Photo</label>
<input
  type="file"
  accept="image/*"
  {...register("photo", { required: true })}
  className="file-input file-input-bordered w-full"
/>

{errors.photo && (
  <p className="text-red-500 text-sm">Photo is required</p>
)}

          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Your Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}

          {/* Password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500 text-sm">
              Minimum 6 characters required
            </p>
          )}

          {/* Confirm Password */}
          <label className="label">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="input"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}

          <button className="btn btn-neutral mt-4">
            Register
          </button>
        </fieldset>

        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 underline"
            state={location.state}
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;