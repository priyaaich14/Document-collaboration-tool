import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Auth from "../routes/Auth";
import Docs from "../routes/Docs";
import DocsDetail from "../routes/DocsDetail";

const AppRouter = ({ isLoggedIn, user, token }) => {
  return (
    <div className="main-container">
      <Switch>
        <Route path="/" exact>
          <Docs isLoggedIn={isLoggedIn} token={token} />
        </Route>
        {!isLoggedIn && (
          <Route path="/login" exact>
            <Auth />
          </Route>
        )}
        <Route path="/docs/:id" exact>
          <DocsDetail token={token} user={user} />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
};

export default AppRouter;
