import React, { useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import './firebase';
import { useNavigate } from "react-router-dom";
import { authContext } from "./AuthProvider";
import "./home.css";
import useAuth from "./useAuth";
import VideoCard from "./Videocard.jsx";
import Header from "./Header.js";
import logo from './instagram.png';
const Home = () => {

  const user = useAuth();
  console.log("In home"+user);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  // const user = useContext(authContext);
  let firstName = '';
   if(user!=null){
   firstName = user.displayName ? user.displayName.split(' ')[0].trim() : ' ';
   }
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
    <div class = "Container">
      <div className="header">
      <div className="header-content">
        <img src={logo} alt="Icon" />
        <div className="brand_name">Instagram</div>
        <div className ="profile">Hi,{firstName}</div>
      <button className = "home_logout_btn" onClick={handleSignout} disabled={isLoggingOut}>
        {isLoggingOut ? "Logging out" : "Log out"}
      </button>
      </div>
    </div>
      <div className = "video_container">
        <VideoCard/>
      </div>
      
      </div>
  );
};

export default Home;