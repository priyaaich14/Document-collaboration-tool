import React from "react";

import { authService, firebaseInstance } from "../config/firebase";

import "./Auth.scss";

const Auth = () => {
  const onClickGoogleLogin = async () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();

    await authService.signInWithPopup(provider);
  };

  return (
    <div className="auth-container">
      <button onClick={onClickGoogleLogin}>GOOGLE LOGIN</button>
    </div>
  );
};

export default Auth;
