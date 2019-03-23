import { inject, observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { AccountsStore } from "../../../../../stores/Accounts.store";
import { MoviesStore } from "../../../../../stores/Movies.store";
import Logo from "../../../../accounts/ui/components/shared/Logo";
import Nav from "../shared/Nav";
import "./main.scss";

interface Props extends RouteComponentProps {
  moviesStore?: MoviesStore;
  accountsStore?: AccountsStore;
}

@inject("moviesStore", "accountsStore")
@observer
class LandingView extends React.Component<Props> {
  resetQuery = () => {
    this.props.moviesStore.resetQuery();
  };

  private resetCredentials = () => {
    this.props.accountsStore.resetCredentials();
  };

  render() {
    return (
      <>
        {this.resetCredentials()}
        {this.resetQuery()}
        <Nav />
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
        <div className="floating-posters" />
      </>
    );
  }
}

export default withRouter(LandingView);
