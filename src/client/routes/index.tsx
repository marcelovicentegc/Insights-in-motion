import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeConnector from "../modules/home/HomeConnector";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={HomeConnector} />
      </Switch>
    </BrowserRouter>
  );
};
