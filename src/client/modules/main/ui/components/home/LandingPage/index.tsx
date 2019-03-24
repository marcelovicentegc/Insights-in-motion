import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import Logo from "../../../../../accounts/ui/components/shared/Logo";
import "./main.scss";

class LandingPage extends React.Component<{} & RouteComponentProps<{}>, null> {
  render() {
    return (
      <>
        <div className="landing-wrapper">
          <div className="presentation">
            <p>
              This is how it works: you type in any movie title in the search
              bar and automagically get it!
            </p>
            <p>
              When you join us, you get exclusive movie details and you can
              create your own list with a bunch of films that you like.
            </p>
            <p>
              You can ask yourself questions like:
              <i> what kind of movie genre have I watched the most?</i> and be
              sure we'll help you with that boring counting!
            </p>
          </div>
          <div className="go-to-app">
            <p>Take me to the app!</p>
            <Logo to="/app" title="InsightInMotion app" icon="🎬" />
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(LandingPage);
