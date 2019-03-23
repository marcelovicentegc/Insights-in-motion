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

@inject("moviesStore", "accountsStore")
@observer
class LogOut extends React.Component<Props> {
  resetQuery = () => {
    this.props.moviesStore.resetQuery();
  };

  resetCredentials = () => {
    this.props.accountsStore.resetCredentials();
  };

  render() {
    return (
      <>
        {this.resetQuery()}
        <Mutation<LogoutUserMutation> mutation={logoutUser}>
          {(mutate, { client }) => (
            <a
              onClick={async () => {
                await mutate();
                await client.resetStore();
                this.props.accountsStore.resetCredentials();
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
