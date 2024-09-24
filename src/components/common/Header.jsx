import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { authService } from "../../config/firebase";
import "./Header.scss";

const Header = ({ isLoggedIn, user, setUser, setToken }) => {
  const navigate = useNavigate(); // Using useNavigate instead of useHistory

  const clickToLogin = () => {
    if (!isLoggedIn) {
      navigate("/login"); // Replacing history.push with navigate
    }
  };

  const clickToLogout = () => {
    if (isLoggedIn) {
      authService.signOut().then(() => {
        setUser(false);
        setToken("");
      });
    }
  };

  const clickToCreateDoc = () => {
    if (isLoggedIn) {
      navigate(`/docs/${uuidV4()}`); // Replacing history.push with navigate
    }
  };

  return (
    <header className="header-container">
      <div className="left-menu"></div>
      <div className="right-menu">
        {isLoggedIn ? (
          <>
            <div className="info-wrap">
              <ul>
                <li>
                  <img src={user.photoURL} alt={user.displayName} />
                </li>
                <li>{user.displayName}</li>
              </ul>
            </div>
            <div className="button-wrap">
              <button onClick={clickToCreateDoc}>Create Document</button>
              <button onClick={clickToLogout}>Logout</button>
            </div>
          </>
        ) : (
          <div className="button-wrap">
            <button onClick={clickToLogin}>Login</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
