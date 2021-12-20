import React from "react";
import { Link } from "react-router-dom";

import useFetch from "../hooks/useFetch";

import DocsItem from "../components/docs/Item";

import "./Docs.scss";

const Docs = ({ isLoggedIn, token }) => {
  const {
    response: docs,
    isLoading,
    error,
  } = useFetch({
    url: "documents",
    token,
  });

  return (
    <div className="docs-container">
      {docs &&
        !isLoading &&
        !error &&
        isLoggedIn &&
        docs.map((doc) => {
          return <DocsItem doc={doc} key={doc._id} />;
        })}
      {error && <h2>Something wrong...</h2>}
      {!error && !isLoggedIn && (
        <Link to="/login">로그인하고 내 목록을 받아보세요!</Link>
      )}
    </div>
  );
};

export default Docs;
