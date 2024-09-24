import React from "react";
import { Link } from "react-router-dom";
import "./Item.scss";

const DocsItem = ({ doc }) => {
  return (
    <div className="docs-item-container">
      <Link to={`/docs/${doc._id}`}>
        {doc.title || "Untitled Document"} {/* Fallback to a default title if doc.title is empty */}
      </Link>
    </div>
  );
};

export default DocsItem;
