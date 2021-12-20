import React from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { authService } from "../../config/firebase";
import "./Header.scss";

const Header = ({ isLoggedIn, user, setUser, setToken }) => {
  const history = useHistory();

  const clickToLogin = () => {
    if (!isLoggedIn) {
      history.push("/login");
    }
  };

  const clickToLogout = () => {
    if (isLoggedIn) {
      return authService.signOut().then(() => {
        setUser(false);
        setToken("");
      });
    }
  };

  const clickToCreateDoc = () => {
    if (isLoggedIn) {
      history.push(`/docs/${uuidV4()}`);
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
              <button onClick={clickToCreateDoc}>문서만들기</button>
              <button onClick={clickToLogout}>로그아웃</button>
            </div>
          </>
        ) : (
          <div className="button-wrap">
            <button onClick={clickToLogin}>로그인</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
