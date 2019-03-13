import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import Logo from "../../../../accounts/ui/components/shared/Logo";
import Nav from "../shared/Nav";
import "./main.scss";

class LandingPage extends React.Component<RouteComponentProps<{}>> {
  render() {
    return (
      <>
        <Nav />
        <div className="landing-wrapper">
          <div className="presentation">
            <p>
              This is how it works: you type in any movie title in the search
              bar and automagically get it!
            </p>
            <p>
              When you join us, you get exclusive movie details and you can
              create your own list with a bunch of movies that you like.
            </p>
          </div>
          <div className="go-to-app">
            <p>Take me to the app!</p>
            <Logo to="/app" title="InsightInMotion app" icon="🎬" />
          </div>
        </div>
        <div className="floating-posters" />
      </>
    );
  }
}

export default withRouter(LandingPage);
