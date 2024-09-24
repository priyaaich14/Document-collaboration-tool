import React from "react";
import { authService, firebaseInstance } from "../config/firebase";

import "./Auth.scss";

const Auth = () => {
  const onClickGoogleLogin = async () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();

    try {
      await authService.signInWithPopup(provider);
      console.log("Google login successful");
    } catch (error) {
      console.error("Google login failed: ", error);
    }
  };

  return (
    <div className="auth-container">
      <button onClick={onClickGoogleLogin}>Google Login</button>
    </div>
  );
};

export default Auth;
