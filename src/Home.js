import React, { useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import './firebase';
import { useNavigate } from "react-router-dom";
import { authContext } from "./AuthProvider";

const Home = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const user = useContext(authContext);

  const handleSignout = () => {
    setIsLoggingOut(true);
    auth.signOut()
      .then(() => {
        console.log("Signing out");
        navigate("/login");
      })
      .catch((error) => {
        console.log("Failed in Signing out", error);
      })
      .finally(() => {
        setIsLoggingOut(false);
      });
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <>
      <button onClick={handleSignout} disabled={isLoggingOut}>
        {isLoggingOut ? "Logging out" : "Log out"}
      </button>
    </>
  );
};

export default Home;
