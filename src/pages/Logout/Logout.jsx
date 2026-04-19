import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Logout = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logOut();

        Swal.fire({
          title: "Logged Out 👋",
          text: "You have been logged out successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/login");
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "Logout failed", "error");
      }
    };

    handleLogout();
  }, [logOut, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <p className="text-lg font-semibold">Logging out...</p>
    </div>
  );
};

export default Logout;
