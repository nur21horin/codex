import { useLocation, useNavigate } from "react-router";
import { useContext } from "react";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const SocialLogin = () => {
  const { signInGoogle } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        console.log(result.user);
        const loggedUser=result.user;
        
        navigate(location.state || "/");

        const userInfo = {
          email: result.user.email,
          displayName: result.user.name,
          photoURL: result.user.photoURL,
        };

        axiosSecure.post("/users", userInfo).then((res) => {
          console.log("user created");
          navigate(location.state || "/");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
   
  );
};

export default SocialLogin;
