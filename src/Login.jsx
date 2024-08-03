import React, { useContext, useEffect, useState } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authContext } from "./AuthProvider";

const Login = () => {
  const user = useContext(authContext);
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  
  const handleLogin = () => {
    setIsAuthenticating(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User signed in:", result.user);
        // Perform any additional actions (e.g., save user info)
        navigate("/home"); // Redirect to "/home" after successful login
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      })
      .finally(() => {
        setIsAuthenticating(false);
      });
  };

  useEffect(() => {
  if (user) {
    navigate("/home"); // Redirect to "/home" if user is already logged in
  }
}
  ,[user,navigate]);

  return (
    <>
      <button onClick={handleLogin} disabled={isAuthenticating}>
        {isAuthenticating ? "Logging in..." : "Login with Google"}
      </button>
      
    </>
  );
};

export default Login;
