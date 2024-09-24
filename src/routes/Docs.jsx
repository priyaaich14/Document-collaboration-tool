import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

import DocsItem from "../components/docs/Item";

import "./Docs.scss";

const Docs = ({ isLoggedIn, token }) => {
  const { response: docs, isLoading, error } = useFetch({
    url: "documents",
    token,
  });

  return (
    <div className="docs-container">
      {isLoggedIn && docs && !isLoading && !error && (
        docs.map((doc) => <DocsItem doc={doc} key={doc._id} />)
      )}

      {error && <h2>Something went wrong...</h2>}

      {!error && !isLoggedIn && (
        <Link to="/login">Login to view your documents</Link>
      )}
    </div>
  );
};

export default Docs;
