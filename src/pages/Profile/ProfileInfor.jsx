import { motion } from "framer-motion";

const ProfileInfo = ({ profile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
    >
      {/* BIO CARD */}
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h3 className="font-bold text-lg">Bio</h3>

          <p className="text-sm text-base-content/70">
            {profile?.bio || "No bio added yet"}
          </p>

          <h3 className="font-bold text-lg mt-4">Skills</h3>

          <div className="flex flex-wrap gap-2 mt-2">
            {(profile?.skills || []).map((s, i) => (
              <span key={i} className="badge badge-outline">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileInfo;