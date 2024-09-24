import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Auth from "../routes/Auth";
import Docs from "../routes/Docs";
import DocsDetail from "../routes/DocsDetail";

const AppRouter = ({ isLoggedIn, user, token }) => {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<Docs isLoggedIn={isLoggedIn} token={token} />} />
        {!isLoggedIn && (
          <Route path="/login" element={<Auth />} />
        )}
        <Route path="/docs/:id" element={<DocsDetail token={token} user={user} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
