import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";


const ProfileSkills = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");

  // ================= FETCH PROFILE =================
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const res = await fetch(
        `https://codesharebackend-1.onrender.com/users/${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${await user.getIdToken()}`,
          },
        }
      );

      const data = await res.json();

      setProfile(data);
      setBio(data?.bio || "");

      // convert skills array → string
      setSkills(
        data?.skills?.map((s) => s.name).join(", ") || ""
      );
    };

    fetchProfile();
  }, [user]);

  // ================= UPDATE PROFILE =================
  const handleUpdate = async () => {
    const skillArray = skills
      .split(",")
      .map((s) => ({
        name: s.trim(),
        rating: 1200, // default CP rating
      }))
      .filter((s) => s.name);

    await fetch("https://codesharebackend-1.onrender.com/users/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await user.getIdToken()}`,
      },
      body: JSON.stringify({
        bio,
        skills: skillArray,
      }),
    });

    alert("Profile updated!");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">

      {/* ================= BIO ================= */}
      <div className="card bg-base-100 shadow p-4">
        <h2 className="font-bold mb-2">Bio</h2>

        <textarea
          className="textarea textarea-bordered w-full"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write your CP bio..."
        />
      </div>

      {/* ================= SKILLS INPUT ================= */}
      <div className="card bg-base-100 shadow p-4">
        <h2 className="font-bold mb-2">Skills</h2>

        <input
          className="input input-bordered w-full"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="DP, Graph, Greedy"
        />

        <p className="text-sm text-gray-500 mt-2">
          Separate skills with commas
        </p>
      </div>

      {/* ================= SAVE BUTTON ================= */}
      <button
        onClick={handleUpdate}
        className="btn btn-primary w-full"
      >
        Save Profile
      </button>

      {/* ================= DISPLAY SECTION ================= */}
      {profile && (
        <div className="card bg-base-100 shadow p-4">

          <h2 className="font-bold mb-3">Your Skills</h2>

          {profile.skills?.length > 0 ? (
            profile.skills.map((skill, i) => (
              <div key={i} className="mb-4">

                {/* NAME + RATING */}
                <div className="flex justify-between text-sm">
                  <span>{skill.name}</span>
                  <span>{skill.rating}</span>
                </div>

                {/* PROGRESS BAR */}
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: `${Math.min(skill.rating / 20, 100)}%`,
                    }}
                  />
                </div>

              </div>
            ))
          ) : (
            <p className="text-gray-500">No skills added yet</p>
          )}

        </div>
      )}

    </div>
  );
};

export default ProfileSkills;