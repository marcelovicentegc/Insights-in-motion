import * as React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router";
import { getConfig } from "../../../../../../server/schema/graphql/Queries.graphql";
import { GetConfigQuery } from "../../../../../__types__/typeDefs";
import Logo from "../../../../accounts/ui/components/shared/Logo";
import Loading from "../messages/Loading";
import "./main.scss";

class LandingPage extends React.Component<RouteComponentProps<{}>> {
  render() {
    return (
      <>
        <div className="landing-wrapper">
          <div className="presentation">
            <p>
              This is how it works: you type in any movie title in the search
              bar and automagically get it!
            </p>
          </div>
          <div className="go-to-app">
            <p>Take me to the app!</p>
            <Logo to="/app" title="InsightInMotion app" />
          </div>
        </div>
        <div className="floating-posters">
          <Query<GetConfigQuery> query={getConfig}>
            {({ data, loading }) => {
              if (loading) return <Loading />;
              console.log(data.config);
              const base_url = data.config.images.secure_base_url;
              return <img src={base_url + "w500/"} />;
            }}
          </Query>
        </div>
      </>
    );
  }
}

export default withRouter(LandingPage);
