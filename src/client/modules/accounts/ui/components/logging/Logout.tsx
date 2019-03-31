import { inject, observer } from "mobx-react";
import * as React from "react";
import Mutation from "react-apollo/Mutation";
import { RouteComponentProps, withRouter } from "react-router";
import { logoutUser } from "../../../../../../server/schema/graphql/Mutations.graphql";
import { AccountsStore } from "../../../../../stores/Accounts.store";
import { MoviesStore } from "../../../../../stores/Movies.store";
import { LogoutUserMutation } from "../../../../../__types__/typeDefs";

interface Props extends RouteComponentProps {
  moviesStore?: MoviesStore;
  accountsStore?: AccountsStore;
}

@inject("accountsStore")
@observer
class LogOut extends React.Component<Props> {
  componentWillUnmount() {
    this.props.accountsStore.resetCredentials();
  }

  render() {
    return (
      <>
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
      </>
    );
  }
}

export default withRouter(LogOut);
