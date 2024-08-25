import React, { useContext, useEffect, useState } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authContext } from "./AuthProvider";
import './Login.css';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  const user = useContext(authContext);
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = () => {
    setIsAuthenticating(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User signed in:", result.user);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      })
      .finally(() => {
        setIsAuthenticating(false);
      });
  };

  const handleEmailPasswordLogin = () => {
    setIsAuthenticating(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("User signed in:", result.user);
        navigate("/home");
      })
      .catch((error) => {
        setLoginError("Invalid email or password.");
      })
      .finally(() => {
        setIsAuthenticating(false);
      });
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div className="login">
      <div className="login-container">
        <h1>Welcome to Reel-clone</h1>
        <div className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {loginError && <p className="login-error">{loginError}</p>}
          <button 
            className="login-btn" 
            onClick={handleEmailPasswordLogin} 
            disabled={isAuthenticating}
          >
            {isAuthenticating ? "Logging in..." : "Login with Email"}
          </button>
          <button 
            className="google-login-btn" 
            onClick={handleLogin} 
            disabled={isAuthenticating}
          >
            {isAuthenticating ? "Logging in..." : (
              <>
                <FaGoogle className="google-icon" />
                Login with Google
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
