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
    authService.onAuthStateChanged(async (user) => {
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
          setUser(null);
          setToken("");
        }
      } else {
        setUser(null);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <div className="app-container">
          <Header
            user={user}
            setUser={setUser}
            isLoggedIn={Boolean(user)}
            setToken={setToken}
          />
          <AppRouter isLoggedIn={Boolean(user)} user={user} token={token} />
        </div>
      ) : (
        "Initializing..."
      )}
    </>
  );
};

export default App;
