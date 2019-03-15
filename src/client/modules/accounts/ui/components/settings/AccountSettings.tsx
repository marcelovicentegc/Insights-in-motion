import { inject, observer } from "mobx-react";
import * as React from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { getUser } from "../../../../../../server/schema/graphql/Queries.graphql";
import { AccountsStore } from "../../../../../stores/Accounts.store";
import { MoviesStore } from "../../../../../stores/Movies.store";
import { GetUserQuery } from "../../../../../__types__/typeDefs";
import Loading from "../../../../app/ui/components/messages/Loading";
import Nav from "../../../../main/ui/components/shared/Nav";
import EditAccount from "./EditAccount";

interface Props {
  moviesStore?: MoviesStore;
  accountsStore?: AccountsStore;
}

@inject("moviesStore", "accountsStore")
@observer
export default class AccountSettings extends React.Component<Props> {
  resetQuery = () => {
    this.props.moviesStore.resetQuery();
  };

  render() {
    return (
      <>
        {this.resetQuery()}
        <Nav />
        <Query<GetUserQuery> query={getUser}>
          {({ data, loading }) => {
            if (loading) return <Loading />;
            if (!data) {
              return <Redirect to="/login" />;
            }
            return (
              <>
                <div className="list-wrapper">
                  <Link
                    to="/list"
                    title="Visit the movies you added to your list"
                  >
                    📝
                  </Link>
                </div>
                <EditAccount user={data.user} />
                {/* stats */}
              </>
            );
          }}
        </Query>
      </>
    );
  }
}
