import React, { useState, useEffect } from "react";
import { authService } from "../config/firebase";
import { httpRequest } from "../lib/request";

import AppRouter from "./Routes";
import Header from "../components/common/Header";

import "./App.scss";

const App = () => {
  const [init, setInit] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const handleAuthChange = async (user) => {
      if (user) {
        try {
          const { token: getToken, user: getUser } = await httpRequest(
            "auth/login",
            {
              method: "POST",
              body: JSON.stringify({
                uniqueId: user.uniqueId,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
              }),
            }
          );

          if (getToken && getUser) {
            setToken(getToken);
            setUser({
              uniqueId: user.uniqueId,
              displayName: user.displayName,
              photoURL: user.photoURL,
            });
          }
        } catch (error) {
          console.error("Login Error:", error); // Added more explicit error logging
          setUser(null);
          setToken("");
        }
      } else {
        setUser(null);
      }
      setInit(true);
    };

    const unsubscribe = authService.onAuthStateChanged(handleAuthChange);

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  if (!init) {
    return <div>Initializing...</div>; // Direct return for simpler conditional rendering
  }

  return (
    <div className="app-container">
      <Header
        user={user}
        setUser={setUser}
        isLoggedIn={Boolean(user)}
        setToken={setToken}
      />
      <AppRouter isLoggedIn={Boolean(user)} user={user} token={token} />
    </div>
  );
};

export default App;
