import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginConnector from "../modules/accounts/connectors/LoginConnector";
import RegisterConnector from "../modules/accounts/connectors/RegisterConnector";
import AccountSettingsConnector from "../modules/accounts/connectors/SettingsConnector";
import AppConnector from "../modules/app/connectors/AppConnector";
import CustomListConnector from "../modules/app/connectors/CustomListConnector";
import LandingConnector from "../modules/app/connectors/LandingConnector";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={LandingConnector} />
        <Route exact={true} path="/app" component={AppConnector} />
        <Route exact={true} path="/list" component={CustomListConnector} />
        <Route exact={true} path="/login" component={LoginConnector} />
        <Route exact={true} path="/join" component={RegisterConnector} />
        <Route
          exact={true}
          path="/settings"
          component={AccountSettingsConnector}
        />
      </Switch>
    </BrowserRouter>
  );
};
