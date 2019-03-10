import * as React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router";
import { logoutUser } from "../../../../../../server/schema/graphql/Mutations.graphql";
import { LogoutUserMutation } from "../../../../../__types__/typeDefs";

class LogOut extends React.Component<RouteComponentProps<{}>> {
  render() {
    return (
      <Mutation<LogoutUserMutation> mutation={logoutUser}>
        {(mutate, { client }) => (
          <a
            onClick={async () => {
              await mutate();
              await client.resetStore();
              this.props.history.push("/");
            }}
          >
            Sign out
          </a>
        )}
      </Mutation>
    );
  }
}

export default withRouter(LogOut);
