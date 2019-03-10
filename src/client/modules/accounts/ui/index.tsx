import * as React from "react";
import { Query } from "react-apollo";
import { GetUserQuery } from "../../../../client/__types__/typeDefs";
import { getUser } from "../../../../server/schema/graphql/Queries.graphql";
import Loading from "../../home/ui/components/messages/Loading";
import Login from "./components/logging/Login";

export default class Accounts extends React.Component {
  render() {
    return (
      <>
        <Query<GetUserQuery> query={getUser}>
          {({ data, loading }) => {
            if (loading) return <Loading />;
            if (data.user.email) return <p>Redirect to settings</p>;
            return (
              <>
                <Login />
              </>
            );
          }}
        </Query>
      </>
    );
  }
}
