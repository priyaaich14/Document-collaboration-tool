import React from "react";
import ReactDOM from "react-dom/client"; // Import the modern ReactDOM
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Route for React Router v6+
import "./index.scss";
import App from "./shared/App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Modern ReactDOM method

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* Updated Route syntax for React Router v6+ */}
      </Routes>
    </Router>
  </React.StrictMode>
);
